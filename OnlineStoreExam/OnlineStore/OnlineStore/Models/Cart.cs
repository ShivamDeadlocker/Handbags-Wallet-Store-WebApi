using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineStore.Models
{
    /// <summary>
    /// This Class Having the Properties Related To Cart Tables
    /// </summary>
    public class Cart
    {
        public int CartID { get; set; }

        public int UserID { get; set; }

        public int ProdID { get; set; }

        public int CartQty { get; set; }

        public int Price { get; set; }

        // Navigation Properties
        public UserDetails User { get; set; }
        public ProductTable Product { get; set; }
    }
}