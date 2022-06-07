using System;

namespace Domain
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
        public DateTime StartDate { get; set; }
        public string Team { get; set; }

    }
}