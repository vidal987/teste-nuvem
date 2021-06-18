using Microsoft.EntityFrameworkCore;
using Nuvem3.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nuvem3.Context
{
    public class DataContext : DbContext
    {                                                              
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }


        public DbSet<Client> Clients { get; set; }
    }
}
