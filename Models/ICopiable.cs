using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkLogger.Models
{
    public interface ICopiable<T>
    {
        void CopiarPropiedades(T t);
    }
}
