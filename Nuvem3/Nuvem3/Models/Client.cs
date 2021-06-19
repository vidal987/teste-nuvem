using System;
using System.ComponentModel.DataAnnotations;

namespace Nuvem3.Models
{
    public class Client : BaseEntity
    {
        public Client(string type, int id, string name, string telefone, string email) : base(id, name)
        {
            Type = type;
            Email = email;
            telefone = Telefone;
        }

        public string Type { get; set; }

        public string Telefone { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }


    }
}
