$(document).ready(() => {
  loadProductId(); //Load Products Id
  loadCategory(); //Load Categories
  disable();
  clear();
  intialButtonState();
});

function intialButtonState() {
  $("#btnAdd").prop("disabled", false);
  $("#btnSave").prop("disabled", true); // Nothing to save yet
  $("#btnEdit").prop("disabled", false);
  $("#btnUpdate").prop("disabled", true); // Nothing to update yet
  $("#btnDelete").prop("disabled", false);
}

//Load Product Id

function loadProductId() {
  $.ajax({
    url: "http://localhost:50696/api/product/all",

    type: "GET",

    dataType: "json",

    success: function (data) {
      $("#ddlProdId").empty();

      $.each(data, function (index, prod) {
        $("#ddlProdId").append(
          '<option value="' + prod.ProdID + '">' + prod.ProdID + "</option>",
        );
      });
    },
  });
}

//Load Categories

function loadCategory() {
  $.ajax({
    url: "http://localhost:50696/api/category/all",

    type: "GET",

    dataType: "json",

    success: function (data) {
      $("#ddlCatId").empty();

      $.each(data, function (index, cat) {
        $("#ddlCatId").append(
          '<option value="' +
            cat.categoryId +
            '">' +
            cat.categoryName +
            "</option>",
        );
      });
    },
  });
}

//Clear For Function

function clear() {
  $("#txtName").val("");
  $("#txtPrice").val("");
  $("#txtImg").val("");
  $("#txtDesc").val("");
  $("#txtQty").val("");
  $("#product-container").html(""); // clear content
  $("#product-container").hide();
}

//Enable Form

function enable() {
  $("#txtName").prop("disabled", false);
  $("#txtPrice").prop("disabled", false);
  $("#txtImg").prop("disabled", false);
  $("#txtDesc").prop("disabled", false);
  $("#txtQty").prop("disabled", false);
  $("#ddlCatId").prop("disabled", false);
}

//Disable Form

function disable() {
  $("#txtName").prop("disabled", true);
  $("#txtPrice").prop("disabled", true);
  $("#txtImg").prop("disabled", true);
  $("#txtDesc").prop("disabled", true);
  $("#txtQty").prop("disabled", true);
  $("#ddlCatId").prop("disabled", true);
}

//Add Button

function addProduct() {
  clear();

  $("#ddlProdId").empty();
  $("#ddlProdId").append(
    '<option value="0">New ProdId Will Generate!!!</option>',
  );
  $("#ddlProdId").prop("disabled", true);
  enable();

  $("#btnAdd").prop("disabled", true); // Can't add while adding
  $("#btnSave").prop("disabled", false); //  Ready to save
  $("#btnEdit").prop("disabled", true); // Can't edit while adding
  $("#btnUpdate").prop("disabled", true); // Not updating
  $("#btnDelete").prop("disabled", true); // Can't delete while adding
}

//Insert Product
// With Form Data And  Image Selection Feature

function saveProduct() {
  let name = $("#txtName").val().trim();
  let price = $("#txtPrice").val().trim();
  let desc = $("#txtDesc").val().trim();
  let qty = $("#txtQty").val().trim();
  let category = $("#ddlCatId").val();

  //Actual File Object
  let file = $("#txtImg")[0].files[0];

  if (!name || !price || !file || !desc || !qty) {
    alert("Please Fill All The Fields!!!");
    return;
  }

  let formData = new FormData();

  formData.append("ProdName", name);
  formData.append("ProdPrice", price);
  formData.append("ProdDsc", desc);
  formData.append("ProdQty", qty);
  formData.append("categoryId", category);
  formData.append("image", file);

  $.ajax({
    url: "http://localhost:50696/api/product/add",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,

    success: function (res) {
      let msg = res;
      alert(msg);
      $("#ddlProdId").prop("disabled", false);
      loadProductId();
      disable();
      clear();
      intialButtonState();
    },

    error: function (err) {
      alert("Error: " + err.responseText);
    },
  });
}

function editProduct() {
  enable();
  $("#btnAdd").prop("disabled", true); // Can't add while editing
  $("#btnSave").prop("disabled", true); // Not saving new record
  $("#btnEdit").prop("disabled", true); // Already editing
  $("#btnUpdate").prop("disabled", false); // Ready to update
  $("#btnDelete").prop("disabled", true); // Can't delete while editing
}

//Update Product With Form Data And With Image Selection Feature
function updateProduct() {
  let id = $("#ddlProdId").val();
  let name = $("#txtName").val().trim();
  let price = $("#txtPrice").val().trim();
  let desc = $("#txtDesc").val().trim();
  let qty = $("#txtQty").val().trim();
  let category = $("#ddlCatId").val();

  let file = $("#txtImg")[0].files[0]; // check file

  let formData = new FormData();

  formData.append("ProdID", id);
  formData.append("ProdName", name);
  formData.append("ProdPrice", price);
  formData.append("ProdDsc", desc);
  formData.append("ProdQty", qty);
  formData.append("categoryId", category);

  // Only append image if selected
  if (file) {
    formData.append("image", file);
  }

  $.ajax({
    url: "http://localhost:50696/api/product/update",
    type: "PUT",
    data: formData,
    contentType: false,
    processData: false,

    success: function (res) {
      let msg = res;
      alert(msg);
      loadProductId();
      disable();
      clear();
      intialButtonState();
    },

    error: function (err) {
      alert("Update failed: " + err.responseText);
    },
  });
}

//  Delete Product

function deleteProduct() {
  let id = parseInt($("#ddlProdId").val());

  if (!id) {
    alert("Select the prodcut id!!!");
  }

  if (!confirm("Are you sure to delete?")) return;

  $.ajax({
    url: `http://localhost:50696/api/product/delete/${id}`,

    type: "DELETE",

    success: (res) => {
      let msg = res;
      alert(msg);
      disable();
      clear();
      loadProductId();
    },

    error: () => {
      alert("Error deleting product");
    },
  });
}

//DDL Change Event
$("#ddlProdId").change(() => {
  let id = $("#ddlProdId").val();

  $.ajax({
    url: "http://localhost:50696/api/product/all",

    type: "GET",

    dataType: "json",

    success: (data) => {
      let prod = data.find((p) => p.ProdID == id);

      $("#txtName").val(prod.ProdName);
      $("#txtPrice").val(prod.ProdPrice);
      $("#txtDesc").val(prod.ProdDsc);
      $("#txtQty").val(prod.ProdQty);
      $("#ddlCatId").val(prod.categoryId);
      $("#product-container").show();

      displaySingleProducts(data);
    },

    error: () => {
      alert("Error fetching employee");
    },
  });
});
