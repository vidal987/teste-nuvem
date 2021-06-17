using System;
using System.Collections.Generic;

namespace AlgoritimoNuvem3
{
    class Program
    {
        static void Main(string[] args)
        {
            List<int> primeiroGrupo = new List<int>(12); 
            List<int> segundoGrupo = new List<int>(12);

            for (int i = 0; i < 12; i++)
            {
                Console.WriteLine("Digite um número");
                string input = Console.ReadLine();

                if (int.TryParse(input, out var number))
                {
                    if (number % 2 == 0 && number <= 10)
                    {
                        primeiroGrupo.Add(number);
                    }
                    else if (number > 10)
                    {
                        segundoGrupo.Add(number);
                    }
                }
            }

            Console.WriteLine("primeiro Grupo");
            foreach (int p in primeiroGrupo)
            {
                Console.WriteLine(p);
            }

            Console.WriteLine("segundo Grupo");
            foreach (int s in segundoGrupo)
            {
                Console.WriteLine(s);
            }

        }
    }
}

