using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nuvem3.Models
{
    public class BaseEntity
    {

        public int Id { get; set; }
        public string Name { get; set; }

        public BaseEntity(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
