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

        private void GenerarEstadistica(List<RegistroHora> registros, DateTime fechaInicio, DateTime fechaFin)
        {
            if (registros.Count == 0)
                return;

            var registrosOrdenados = registros.OrderBy(x => x.FechaHora);
            var sumaTotalHoras = 0.0;

            while (fechaFin.Date >= fechaInicio.Date){
                var registrosXDia = registrosOrdenados.Where(x=>x.FechaHora.Date == fechaInicio);
                var nuevoRegistroDia = new RegistroDia(registrosXDia.ToList());
                this.RegistrosDia.Add(nuevoRegistroDia);
                sumaTotalHoras += nuevoRegistroDia.Horas;
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
            // Si tenemos un número de registros impar, procedemos a eliminar el último para realizar el cálculo.
            if (registros.Count % 2 != 0)
            {
                registros.RemoveAt(registros.Count - 1);
            }
            var sumaHoras = 0.0;
            var indice = 0;
            for (; indice < registros.Count; indice += 2)
            {
                var diferencia = new TimeSpan(registros[indice + 1].FechaHora.Ticks - registros[indice].FechaHora.Ticks);
                sumaHoras += diferencia.TotalHours;
            }
            // Si al menos hemos tenido un registro, nos molestamos en asignar el resultado
            if (registros.Count > 0)
            {
                this.Horas = sumaHoras;
                this.Dia = registros.First().FechaHora.Date;
            }
        }
    }
}