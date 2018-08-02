function patientTable() {

}

// <table class="table">
//   <thead class="thead-dark">
//     <tr  >
//       <th scope="col">#</th>
//       <th scope="col">First</th>
//       <th scope="col">Last</th>
//       <th scope="col">Handle</th>
//     </tr>
//   </thead>
//   <tbody >
//     <tr onclick="window.location.href='patient/'" class="nodeInformation">
//       <th scope="row">1</th>
//       <td>Mark</td>
//       <td>Otto</td>
//       <td>@mdo</td>
//     </tr>
//   </tbody>
// </table>

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
