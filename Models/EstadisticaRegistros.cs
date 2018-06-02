using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace WorkLogger.Models
{
    public class EstadisticaRegistros
    {
        public double TotalHoras { get; set; }
        public List<RegistroDia> RegistrosDia { get; set; }

        public EstadisticaRegistros()
        {
            this.RegistrosDia = new List<RegistroDia>();
        }
        public EstadisticaRegistros(List<RegistroHora> registros, DateTime fechaInicio, DateTime fechaFin) : this()
        {
            this.GenerarEstadistica(registros, fechaInicio, fechaFin);
        }

        private List<RegistroHora> ObtenerRegistrosDia(IOrderedEnumerable<RegistroHora> registros, DateTime fechaInicio) {
            var registrosXDia = registros.Where(x => x.FechaHora.Date == fechaInicio).ToList();
            // Si tenemos un número de registros impar, procedemos a eliminar el último para realizar el cálculo.
            if (registrosXDia.Count() % 2 != 0) { 
                registrosXDia.RemoveAt(registros.Count() - 1);
            }
            return registrosXDia;
        }

        private void GenerarEstadistica(List<RegistroHora> registros, DateTime fechaInicio, DateTime fechaFin)
        {
            if (registros.Count == 0)
                return;

            var registrosOrdenados = registros.OrderBy(x => x.FechaHora);
            var sumaTotalHoras = 0.0;

            while (fechaFin >= fechaInicio)
            {
                var registrosXDia = ObtenerRegistrosDia(registrosOrdenados, fechaInicio); 
                if (registrosXDia.Count() > 0)
                {
                    var nuevoRegistroDia = new RegistroDia(registrosXDia.ToList());
                    this.RegistrosDia.Add(nuevoRegistroDia);
                    sumaTotalHoras += nuevoRegistroDia.Horas;
                }
                fechaInicio = fechaInicio.AddDays(1);
            }

            this.TotalHoras = sumaTotalHoras;
        }
    }

    public class RegistroDia
    {
        public double Horas { get; set; }
        public DateTime Dia { get; set; }

        public RegistroDia() { }
        public RegistroDia(List<RegistroHora> registros)
        {
            this.GenerarRegistroDia(registros);
        }

        private void GenerarRegistroDia(List<RegistroHora> registros)
        {
            var sumaHoras = 0.0;
            for (var indice = 0; indice < registros.Count; indice += 2)
            {
                var diferencia = new TimeSpan(registros[indice + 1].FechaHora.Ticks - registros[indice].FechaHora.Ticks);
                sumaHoras += diferencia.TotalHours;
            }

            this.Horas = sumaHoras;
            this.Dia = registros.First().FechaHora.Date;
        }
    }
}