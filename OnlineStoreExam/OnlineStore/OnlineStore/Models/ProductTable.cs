using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineStore.Models
{
    /// <summary>
    /// This Class Having the Properties Related To ProductTable
    /// </summary>
    public class ProductTable
    {
        public int ProdID { get; set; }

        public string ProdName { get; set; }

        public int ProdPrice { get; set; }

        public string ProdImg { get; set; }

        public string ProdDsc { get; set; }

        public int ProdQty { get; set; }

        public int categoryId { get; set; }

        // Navigation Property
        public Category Category { get; set; }
    }
}