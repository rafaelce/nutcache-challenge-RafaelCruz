using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>{
                    new AppUser {DisplayName="Bob", UserName="bob", Email="bob@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

            }

            if (context.Employees.Any()) return;

            var employees = new List<Employee>
            {
                new Employee
                {
                    Name = "User 01",
                    BirthDate = DateTime.Now.AddYears(-30),
                    Gender = "Male",
                    Email = "bob@test.com",
                    CPF = "086.493.840-30",
                    StartDate = DateTime.Now.AddMonths(-2),
                    Team = "Mobile"
                }
            };

            await context.Employees.AddRangeAsync(employees);
            await context.SaveChangesAsync();
        }
    }
}