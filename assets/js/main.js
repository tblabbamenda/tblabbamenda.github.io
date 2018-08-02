function createDTC() {
  console.log("inserting into DTC");
  var region = document.getElementById("create_dtc_form");
  var regionName = region.region.value;
  var regionShortcode = region.code.value;

  var cdt = region.name_of_cdt.value;
  var cdtShortcode = region.cdtcode.value;

  // var regionName = "Bamenda"
  // var regionShortcode = "BMD";
  //
  // var cdt = "General Hospital";
  // var cdtShortcode = "GH";

  var regionValue = {
    "name":regionName,
    "shortcode":regionShortcode
  };

  var cdtValue = {
    "name":cdt,
    "shortcode":cdtShortcode
  };

  // console.log("Region: " + region.region.value);
  // console.log("CDT: " + cdt);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Server response: " + this.responseText);
    } else {
      console.log(this.status);
    }
  };

  xhttp.open("POST", "http://tbproject.localhost/controller.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("type=insert&data=communities&region="+JSON.stringify(regionValue)+"&cdt="+JSON.stringify(cdtValue));
  return false;
}

function createWorker() {
  console.log("Creating worker");
  var form = document.getElementById("create_worker_form");

  var name = form.name.value;
  var email = form.email.value;
  var phonenumber = form.phonenumber.value;
  var password = form.password.value;
  var region = form.region.value;
  var cdt = form.cdt.value;
  // var name = "Sherlock Wisdom";
  // var email = "wisdomnji@gmail.com";
  // var phonenumber = "652156811";
  // var password = "darwin";
  // var region = "bamenda";
  // var cdt = "general hospital";

  var role = {
    get: function() {
      var values = new Array();
      if(form.requester.checked)
        values.push(form.requester.value);
      if(form.lab.checked)
        values.push(form.lab.value);
      if(form.outcome_recorded.checked)
        values.push(form.outcome_recorded.value);
      if(form.specimen_collection.checked)
        values.push(form.specimen_collection.value);
      if(form.follow_up.checked)
        values.push(form.follow_up.value);
      return values;
    }
  };

  console.log("Role: " + role.get());

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Server response: " + this.responseText);
      document.getElementById("close_button").click();
    }
  };

  xhttp.open("POST", "http://tbproject.localhost/controller.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("type=insert&data=user&name="+name+"&email="+email+"&phonenumber="+phonenumber+"&password="+password+"&region="+region+"&cdt="+cdt+"&role="+JSON.stringify(role.get()));
  return false;
}

function patientTable() {

}

function Table(rowheaders) {
  // var tr = document.createElement("tr");
  // var thCount = document.createElement("th");
  // thCount.setAttribute("scope", "col");
  // thCountNode = document.createTextNode("#");
  // thCount.appendChild(thCountNode);
  this.table = document.createElement("table");
  this.thead = document.createElement("thead");
  this.tbody = document.createElement("tbody");


  this.addvalues = function(rowvalues, action) {
    var tr = document.createElement("tr");
    for(var x in rowvalues) {
      var th = document.createElement("th");
      th.setAttribute("scope", "col");
      var thNode = document.createTextNode(rowvalues[x]);
      th.appendChild(thNode);
      tr.appendChild(th);
    }
    tr.className = "nodeInformation";
    tr.onclick = function() {
      window.location.href=action;
    };
    this.tbody.appendChild(tr);
  };

  this.get = function() {
    var tr = document.createElement("tr");
    for(var x in rowheaders) {
      var th = document.createElement("th");
      th.setAttribute("scope", "col");
      var thNode = document.createTextNode(rowheaders[x]);
      th.appendChild(thNode);
      tr.appendChild(th);
    }
    this.thead.appendChild(tr);

    this.thead.className = "thead-dark";
    this.table.className = "table";
    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);

    return this.table;
  };
}

function getCommunities(option) {
  var xhttp = new XMLHttpRequest();
  if(option == "display_table") {
    // console.log("Creating user table");
    var rowheaders = ['Region', 'Shortcode'];
    var rowvalues = ['Bamenda', 'BDA'];

    console.log("Option: " + option);

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("server said: "  + this.responseText);
        var serverResponse = JSON.parse(this.responseText);
        // console.log("size: " + serverResponse.length);
        // console.log("Option: " + option);
        if(Object.keys(serverResponse).length > 0) {
          var regions = document.getElementById("region");
          var cdt = document.getElementById("cdt");
          var rowheaders = ['Region', 'Shortcode'];
          var userTable = new Table(rowheaders);
          for(var x in Object.keys(serverResponse)) {
            var rowvalues = new Array();
            rowvalues.push(Object.keys(serverResponse)[x]);
            rowvalues.push(serverResponse[Object.keys(serverResponse)[x]].shortcode);

            userTable.addvalues(rowvalues, "pages/");
          }
          document.getElementById("table_location").appendChild(userTable.get());
        }
      }
    };
  } else  {
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("server said: "  + this.responseText);
        var serverResponse = JSON.parse(this.responseText);
        // console.log("size: " + serverResponse.length);
        // console.log("Option: " + option);
        if(Object.keys(serverResponse).length > 0) {
          var regions = document.getElementById("region");
          for(var x in Object.keys(serverResponse)) {
            var key = Object.keys(serverResponse)[x];

            var region = document.getElementById("region");
            var option = document.createElement("option");
            option.value = key;
            optionNode = document.createTextNode(key);
            option.appendChild(optionNode);
            option.onclick = function() {
              var cdt = document.getElementById("cdt");
              cdt.innerHTML = "";
              for(var y in serverResponse[this.value].communities) {
                var cdtname = serverResponse[this.value].communities[y];
                // console.log("CDT Name: " + cdtname);
                cdtNode = document.createTextNode(cdtname);
                var option1 = document.createElement("option");
                option1.appendChild(cdtNode);
                cdt.appendChild(option1);
              }
            };
            region.appendChild(option);
          }
        }
      }
    };
  }

  xhttp.open("GET", "http://tbproject.localhost/controller.php?type=fetch&data=communities", true);
  // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

function getUsers(option) {
  console.log("Creating user table");
  var rowheaders = ['Name', 'Phonenumber', 'Community'];
  var rowvalues = ['sherlock', '652156811', 'bamenda'];
  var userTable = new Table(rowheaders);
  console.log("Option: " + option);

  userTable.addvalues(rowvalues, "pages/");
  userTable.addvalues(rowvalues, "pages/");

  document.getElementById("table_location").appendChild(userTable.get());
}

function getPatients(option) {
  // console.log("listing speciments for " +patientId + "\n");
  console.log("Getting patients");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // console.log("server said: "  + this.responseText);
      var serverResponse = JSON.parse(this.responseText);
      if(serverResponse.length > 0) {
        // document.getElementById("no_specimen").setAttribute('hidden', 'hidden');
        var table = document.createElement("table");
        table.className = "table";
        var thead = document.createElement("thead");
        thead.className = "thead-dark";
        var tr = document.createElement("tr");

        var thCount = document.createElement("th");
        thCount.setAttribute("scope", "col");
        thCountNode = document.createTextNode("#");
        thCount.appendChild(thCountNode);

        var thName = document.createElement("th");
        thName.setAttribute("scope", "col");
        thCountNode = document.createTextNode("Name");
        thName.appendChild(thCountNode);

        var thPhonenumber = document.createElement("th");
        thPhonenumber.setAttribute("scope", "col");
        thCountNode = document.createTextNode("Phonenumber");
        thPhonenumber.appendChild(thCountNode);

        var thAge = document.createElement("th");
        thAge.setAttribute("scope", "col");
        thCountNode = document.createTextNode("Age");
        thAge.appendChild(thCountNode);

        tr.appendChild(thCount);
        tr.appendChild(thName);
        tr.appendChild(thPhonenumber);
        tr.appendChild(thAge);

        thead.appendChild(tr);
        var tbody = document.createElement("tbody");

        for(var x in serverResponse) {
          var tr1 = document.createElement("tr");
          tr1.className = "nodeInformation";
          tr1.onclick = function() {
            window.location.href = "patient/";
          };
          var th = document.createElement("th");
          th.setAttribute("scope", "row");
          thNode = document.createTextNode(parseInt(x) + 1);
          th.appendChild(thNode);

          var thName = document.createElement("th");
          // thName.setAttribute("scope", "col");
          thCountNode = document.createTextNode(serverResponse[x].name);
          thName.appendChild(thCountNode);

          var thPhonenumber = document.createElement("th");
          // thPhonenumber.setAttribute("scope", "col");
          thCountNode = document.createTextNode(serverResponse[x].phonenumber);
          thPhonenumber.appendChild(thCountNode);

          var thAge = document.createElement("th");
          // thAge.setAttribute("scope", "col");
          thCountNode = document.createTextNode(serverResponse[x].age);
          thAge.appendChild(thCountNode);

          tr1.appendChild(th);
          tr1.appendChild(thName);
          tr1.appendChild(thPhonenumber);
          tr1.appendChild(thAge);
          tbody.appendChild(tr1);
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        document.getElementById("table_location").appendChild(table);
      }
    }
  };

  xhttp.open("GET", "http://tbproject.localhost/controller.php?type=fetch&data=patients", true);
  // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

function more_cdt() {
  console.log("More cdt");
  var cdtLocation = document.getElementById("cdt_row")
  cdtLocation = cdtLocation.cloneNode(true);
  document.getElementById("cdt_location").appendChild(cdtLocation);

  console.log("number of cdts: " + document.getElementById("name_of_cdt").value);
  console.log("cdtcode: " + document.getElementById("cdtcode").length);
}
