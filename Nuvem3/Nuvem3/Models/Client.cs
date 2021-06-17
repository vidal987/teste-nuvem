using System;

namespace Nuvem3.Models
{
    public class Client : BaseEntity
    {
        public Client(string type, int id, string name) : base(id, name)
        {
            Type = type;
        }

        public string Type { get; set; }


    }
}
