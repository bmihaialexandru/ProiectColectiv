using Contracts.DataViews;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Service
{
    public interface IDummyService
    {
        IList<DummyDataView> GetAllDummies();

        void AddDummy(DummyDataView d);
    }
}
