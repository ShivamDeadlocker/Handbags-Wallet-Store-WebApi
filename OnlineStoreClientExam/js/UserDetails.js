$(document).ready(() => {
  loadUserId(); // Load UserId dropdown
  loadUserType(); // Load User Type dropdown
  clear();
  disable();
});

//Load UserID Data and Append in the DDl
function loadUserId() {
  $.ajax({
    url: "http://localhost:50696/api/userdetails/user/",

    type: "GET",

    dataType: "json",

    success: function (data) {
      $("#ddlUser").empty();

      $.each(data, function (index, user) {
        $("#ddlUser").append(
          '<option value="' + user.UserID + '">' + user.UserID + "</option>",
        );
      });
    },

    error: function (err) {
      alert("Failed to load User Id: " + err.responseText);
    },
  });
}

//Load User Type Data and Append in the DDl
function loadUserType() {
  $.ajax({
    url: "http://localhost:50696/api/userdetails/userType/",

    type: "GET",

    dataType: "json",

    success: function (data) {
      $("#ddlUserType").empty();

      $.each(data, function (index, userType) {
        $("#ddlUserType").append(
          '<option value="' +
            userType.TypeId +
            '">' +
            userType.TypeName +
            "</option>",
        );
      });
    },

    error: function (err) {
      alert("Failed to load User Type: " + err.responseText);
    },
  });
}

//Clear For Function
function clear() {
  $("#name").val("");
  $("#email").val("");
  $("#password").val("");
}

function disable() {
  $("#name").prop("disabled", true);
  $("#email").prop("disabled", true);
  $("#password").prop("disabled", true);
  $("#ddlUserType").prop("disabled", true);
}

//DDL Change Event

$("#ddlUser").change(() => {
  let id = $("#ddlUser").val();

  $.ajax({
    url: "http://localhost:50696/api/userdetails/user",

    type: "GET",

    dataType: "json",

    success: (data) => {
      let user = data.find((u) => u.UserID == id);

      $("#name").val(user.UserName);
      $("#email").val(user.UserEmail);
      $("#password").val(user.UserPassword);
      $("#ddlUserType").val(user.TypeId);
    },

    error: () => {
      alert("Error fetching user!!!");
    },
  });
});
