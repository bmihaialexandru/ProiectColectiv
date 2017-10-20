using Contracts.Service;
using DataAccess.Model;
using iQuarc.DataAccess;
using Microsoft.Practices.ServiceLocation;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Configuration;
using Service;
using System.Web.Http;
using Unity.WebApi;

namespace WebApp
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();


            container.RegisterType<IDbContextFactory, DbContextFactory<ColectivEntities>>(new HierarchicalLifetimeManager());
            container.RegisterType<IInterceptorsResolver, InterceptorsResolver>(new HierarchicalLifetimeManager());
            container.RegisterType<IDummyService, DummyService>();
            container.RegisterType<IRepository, Repository>(new HierarchicalLifetimeManager());
            container
            .RegisterInstance(typeof(IServiceLocator), new UnityServiceLocator(container));

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}