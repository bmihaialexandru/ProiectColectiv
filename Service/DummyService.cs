using Contracts.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contracts.DataViews;
using Service.ViewBuilders;
using DataAccess.Model;
using iQuarc.DataAccess;

namespace Service
{
    public class DummyService : IDummyService
    {
        private IRepository _repository;

        public DummyService(IRepository repo)
        {
            if (repo == null)
                throw new ArgumentNullException(nameof(repo));
            _repository = repo;
        }

        public void AddDummy(DummyDataView d)
        {
            using (IUnitOfWork uof = _repository.CreateUnitOfWork())
            {

                uof.Add(DummyViewBuilder.GetModel(d));
                uof.SaveChanges();
            }
        }

        public IList<DummyDataView> GetAllDummies()
        {
            var expr = DummyViewBuilder.GetProjection();

            return _repository.GetEntities<Dummy>().Select(expr).ToList();
        }
    }
}
