using Contracts.DataViews;
using Contracts.Service;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApp.Controllers
{
    public class DummyController : ApiController
    {
        private IDummyService _dummyService;

        public DummyController(IDummyService dummyService)
        {
            if (dummyService == null)
            {
                throw new ArgumentNullException();
            }
            _dummyService = dummyService;
        }

        // GET: api/Dummy
        public IEnumerable<DummyDataView> Get()
        {
            return _dummyService.GetAllDummies();
        }

        // GET: api/Dummy/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Dummy
        public void Post([FromBody]DummyDataView d)
        {
            Trace.WriteLine(d.Name);
            Trace.WriteLine(d.Name);
            Trace.WriteLine(d.Name);
            Trace.WriteLine(d.Name);
            Trace.WriteLine(d.Name);
            Trace.WriteLine(d.Name);
            Trace.WriteLine(d.Name);

            _dummyService.AddDummy(d);
        }
        
    }
}
