using DataAccess.Model;
using Contracts.DataViews;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Service.ViewBuilders
{
    public class DummyViewBuilder
    {
        public static Dummy GetModel(DummyDataView d)
        {
            return new Dummy()
            {
                Name = d.Name
            };
        }

        public static Expression<Func<Dummy, DummyDataView>> GetProjection()
        {
            return d => new DummyDataView()
            {
                Id = d.Id,
                Name = d.Name
            };
        }
    }
}
