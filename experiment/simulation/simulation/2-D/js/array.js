window.model = {
  i: 0,
  j: 0,
  k: 0,
  p: 0,
  q: 0,
  r: 0,
  a: 0,
  b: 0,
  firstElement: 0,
  secondElement: 0,
  multiplyElements: function () {
    return this.firstElement * this.secondElement;
  },
};

window.view = {
  matrixA: new Array(),
  matrixB: new Array(),
  rowsA: 0,
  rowsB: 0,
  colsA: 0,
  colsB: 0,
  matrixCount: 1,
  lastRedDiv: new Object(),
  nextRedDiv: new Object(),
  changeClass: function (id, className) {
    document.getElementById(id).className = className;
  },
  resetVariables: function () {
    model.i = 0;
    model.j = 0;
    model.k = 0;
    model.p = 0;
    model.q = 0;
    model.r = 0;
    model.a = 0;
    model.b = 0;
    model.firstElement = 0;
    model.secondElement = 0;
    this.matrixA = new Array();
    this.matrixB = new Array();
    this.rowsA = 0;
    this.rowsB = 0;
    this.colsA = 0;
    this.colsB = 0;
    this.matrixCount = 1;
    this.lastRedDiv = new Object();
    this.nextRedDiv = new Object();
  },
  getLastHighlightedDiv: function () {
    var findClass = document.getElementsByClassName("showDivInRed");
    return findClass[0];
  },
  getNextDivToHighlight: function (lastHighlightedDiv) {
    var next = lastHighlightedDiv.nextSibling;
    next = next.nextSibling;
    return next;
  },
  jumpTo: function (targetDivId) {
    var element = document.createElement("div");
    element.id = targetDivId;
    return element;
  },
  disableButton: function (buttonId) {
    // On mobile, do not disable input fields or OK button
    var isMobile =
      window.matchMedia && window.matchMedia("(max-width: 600px)").matches;
    var el = document.getElementById(buttonId);
    if (
      isMobile &&
      (buttonId === "row" || buttonId === "col" || buttonId === "2DbtnOK")
    ) {
      el.disabled = false;
    } else {
      el.disabled = true;
    }
    if (buttonId === "2DbtnOK") {
      setTimeout(function () {
        var btn = document.getElementById("2DbtnOK");
        var style = window.getComputedStyle(btn);
        var rect = btn.getBoundingClientRect();
        console.log(
          "[LOG] disableButton 2DbtnOK: disabled",
          btn.disabled,
          "display",
          style.display,
          "opacity",
          style.opacity,
          "pointer-events",
          style.pointerEvents,
          "rect",
          rect,
        );
      }, 0);
    }
  },
  enableButton: function (buttonId) {
    var el = document.getElementById(buttonId);
    el.disabled = false;
    if (buttonId === "2DbtnOK") {
      setTimeout(function () {
        var btn = document.getElementById("2DbtnOK");
        var style = window.getComputedStyle(btn);
        var rect = btn.getBoundingClientRect();
        console.log(
          "[LOG] enableButton 2DbtnOK: disabled",
          btn.disabled,
          "display",
          style.display,
          "opacity",
          style.opacity,
          "pointer-events",
          style.pointerEvents,
          "rect",
          rect,
        );
      }, 0);
    }
  },
  addClickEvent: function (id, method) {
    var element = document.getElementById(id);
    if (!element) {
      console.log("[LOG] addClickEvent: Element with id", id, "not found");
      return;
    }
    element.addEventListener(
      "click",
      function (e) {
        console.log(
          "[LOG] Click event on",
          id,
          "isMobile:",
          window.matchMedia && window.matchMedia("(max-width: 600px)").matches,
        );
        method(e);
      },
      false,
    );
    console.log("[LOG] addClickEvent: Bound click for", id);
  },
  activateEvents: function () {
    this.addClickEvent("2DbtnOK", function () {
      console.log("[LOG] 2DbtnOK handler called");
      view.getRowsAndCols();
    });
    this.addClickEvent("generateA", function () {
      console.log("[LOG] generateA handler called");
      view.generateFirstMatrixElements();
    });
    this.addClickEvent("generateB", function () {
      console.log("[LOG] generateB handler called");
      view.generateSecondMatrixElements();
    });
    this.addClickEvent("btnStart2D", function () {
      console.log("[LOG] btnStart2D handler called");
      view.generateMatrices();
    });
    this.addClickEvent("btnNext2D", function () {
      console.log("[LOG] btnNext2D handler called");
      view.multiplyMatrices();
    });
  },
  highlightNextStep: function () {
    this.changeClass(this.lastRedDiv.id, "show");
    this.changeClass(this.nextRedDiv.id, "showDivInRed");
  },
  showCode: function () {
    this.changeClass("2-dArray", "show");
  },
  getRowsAndCols: function () {
    console.log("[LOG] getRowsAndCols called");
    var row = Number(document.getElementById("row").value);
    var col = Number(document.getElementById("col").value);
    var feedbackPanel = document.getElementById("feedbackPanel");
    var isMobile =
      window.matchMedia && window.matchMedia("(max-width: 600px)").matches;
    console.log(
      "[LOG] getRowsAndCols: row",
      row,
      "col",
      col,
      "isMobile",
      isMobile,
      "matrixCount",
      this.matrixCount,
    );
    if (row === 0 || col === 0) {
      if (feedbackPanel)
        feedbackPanel.innerText =
          "Please enter both row and column values greater than 0.";
      else alert("Enter Matrix Size First !");
      console.log("[LOG] getRowsAndCols: Invalid input (zero)");
    } else if (isNaN(row) || isNaN(col)) {
      if (feedbackPanel)
        feedbackPanel.innerText = "Matrix size must be an integer value!";
      else alert("Matrix Size Must Be An Integer Value !");
      console.log("[LOG] getRowsAndCols: Invalid input (NaN)");
    } else {
      if (feedbackPanel) feedbackPanel.innerText = "";
      if (this.matrixCount === 1) {
        this.enableButton("generateA");
        this.changeClass("generateA", "button GenerateValueButton");
        this.rowsA = row;
        this.colsA = col;
        console.log(
          "[LOG] getRowsAndCols: Enabled generateA, rowsA",
          this.rowsA,
          "colsA",
          this.colsA,
        );
      } else {
        this.enableButton("generateB");
        this.changeClass("generateB", "button GenerateValueButton");
        this.rowsB = row;
        this.colsB = col;
        console.log(
          "[LOG] getRowsAndCols: Enabled generateB, rowsB",
          this.rowsB,
          "colsB",
          this.colsB,
        );
      }
      // On mobile, do not disable OK button
      if (!isMobile) {
        this.disableButton("2DbtnOK");
        this.changeClass("2DbtnOK", "startButton disableButton");
        console.log("[LOG] getRowsAndCols: Disabled 2DbtnOK (desktop)");
      } else {
        this.enableButton("2DbtnOK");
        this.changeClass("2DbtnOK", "button startButton");
        console.log("[LOG] getRowsAndCols: Kept 2DbtnOK enabled (mobile)");
      }
    }
    console.log("[LOG] getRowsAndCols exit");
  },
  resetRowsAndCols: function () {
    document.getElementById("row").value = this.colsA;
    document.getElementById("col").value = "";
  },
  generateFirstMatrixElements: function () {
    var size = this.rowsA * this.colsA;
    this.matrixA = [];
    for (i = 0; i < size; i++) {
      var random = Math.floor(Math.random() * 15);
      this.matrixA.push(random);
    }
    var feedbackPanel = document.getElementById("feedbackPanel");
    if (feedbackPanel)
      feedbackPanel.innerText =
        "Matrix A generated: " + this.matrixA.join(", ");
    this.resetRowsAndCols();
    var isMobile =
      window.matchMedia && window.matchMedia("(max-width: 600px)").matches;
    if (!isMobile) {
      this.disableButton("row");
    } else {
      this.enableButton("row");
    }
    this.disableButton("generateA");
    this.changeClass("generateA", "disableButton GenerateValueButton hide");
    this.changeClass("generateB", "buttonDisable GenerateValueButton show");
    this.enableButton("2DbtnOK");
    this.changeClass("2DbtnOK", "button startButton");
    this.matrixCount++;
  },
  generateSecondMatrixElements: function () {
    var size = this.rowsB * this.colsB;
    this.matrixB = [];
    for (i = 0; i < size; i++) {
      var random = Math.floor(Math.random() * 15);
      this.matrixB.push(random);
    }
    var feedbackPanel = document.getElementById("feedbackPanel");
    if (feedbackPanel)
      feedbackPanel.innerText =
        "Matrix B generated: " + this.matrixB.join(", ");
    this.disableButton("generateB");
    this.changeClass("generateB", "buttonDisable GenerateValueButton show");
    var isMobile =
      window.matchMedia && window.matchMedia("(max-width: 600px)").matches;
    if (!isMobile) {
      this.disableButton("col");
    } else {
      this.enableButton("col");
    }
    this.enableButton("btnStart2D");
    this.changeClass("btnStart2D", "button myStartButton");
  },
  generateMatrixA: function () {
    var matA = document.createElement("table");
    matA.className = "table";
    // var caption = matA.createCaption();
    // caption.innerHTML = ""
    for (i = 0; i < this.rowsA; i++) {
      var row = document.createElement("tr");
      for (j = 0; j < this.colsA; j++) {
        var col = document.createElement("td");
        col.className = "matrixCell";
        row.appendChild(col);
      }
      matA.appendChild(row);
    }
    document.getElementById("matrixA").appendChild(matA);
    var elements = document
      .getElementById("matrixA")
      .getElementsByTagName("td");
    for (i = 0; i < elements.length; i++) {
      elements[i].innerHTML = this.matrixA[i];
    }
  },
  generateMatrixB: function () {
    var matB = document.createElement("table");
    matB.className = "table";
    // var caption = matB.createCaption();
    // caption.innerHTML = "<b>Matrix B</b>"
    for (i = 0; i < this.rowsB; i++) {
      var row = document.createElement("tr");
      for (j = 0; j < this.colsB; j++) {
        var col = document.createElement("td");
        col.className = "matrixCell";
        row.appendChild(col);
      }
      matB.appendChild(row);
    }
    document.getElementById("matrixB").appendChild(matB);
    var elements = document
      .getElementById("matrixB")
      .getElementsByTagName("td");
    for (i = 0; i < elements.length; i++) {
      elements[i].innerHTML = this.matrixB[i];
    }
  },
  generateResultantMatrix: function () {
    var matResultant = document.createElement("table");
    matResultant.className = "table";
    // var caption = matResultant.createCaption();
    // caption.innerHTML = "<b>Resultant Matrix</b>"
    for (i = 0; i < this.rowsA; i++) {
      var row = document.createElement("tr");
      for (j = 0; j < this.colsB; j++) {
        var col = document.createElement("td");
        col.className = "resultMatrixCell";
        row.appendChild(col);
      }
      matResultant.appendChild(row);
    }
    document.getElementById("resultantMatrix").appendChild(matResultant);
    var elements = document
      .getElementById("resultantMatrix")
      .getElementsByTagName("td");
    for (i = 0; i < elements.length; i++) {
      elements[i].innerHTML = -1;
    }
  },
  generateMatrices: function () {
    this.showCode();
    this.generateMatrixA();
    this.generateMatrixB();
    this.generateResultantMatrix();
    // Clear Matrix B generated message after simulation starts
    var feedbackPanel = document.getElementById("feedbackPanel");
    if (feedbackPanel) feedbackPanel.innerText = "";
    this.disableButton("btnStart2D");
    this.changeClass("btnStart2D", "buttonDisable myStartButton");
    this.enableButton("btnNext2D");
    this.changeClass("btnNext2D", "nextButton button");
    this.changeClass("line21", "showDivInRed");
  },
  highlightRowMatrixA: function () {
    var tableA = document.getElementById("matrixA").firstChild;
    for (model.i, model.j; model.j < this.colsA; model.j++)
      tableA.rows[model.i].cells[model.j].className = "matrixCell blueCell";
    model.j = 0;
  },
  highlightColMatrixB: function () {
    var tableB = document.getElementById("matrixB").firstChild;
    for (model.p, model.q; model.p < this.rowsB; model.p++)
      tableB.rows[model.p].cells[model.q].className = "matrixCell blueCell";
  },
  highlightNextColumn: function () {
    if (model.q > 0) {
      var tableA = document.getElementById("matrixA").firstChild;
      for (model.i, model.j; model.j < this.colsA; model.j++)
        tableA.rows[model.i].cells[model.j].className = "matrixCell blueCell";
      var tableB = document.getElementById("matrixB").firstChild;
      for (model.p, model.q; model.p < this.rowsB; model.p++)
        tableB.rows[model.p].cells[model.q - 1].className = "matrixCell";
      model.j = 0;
      model.p = 0;
    }
  },
  highlightMatrixElements: function () {
    var tableA = document.getElementById("matrixA").firstChild;
    var firstElement = tableA.rows[model.i].cells[model.k];
    firstElement.className = "matrixCell yellowCell";
    model.firstElement = firstElement.innerHTML;
    var tableB = document.getElementById("matrixB").firstChild;
    var secondElement = tableB.rows[model.r].cells[model.q];
    secondElement.className = "matrixCell yellowCell";
    model.secondElement = secondElement.innerHTML;
    var tableRes = document.getElementById("resultantMatrix").firstChild;
    var resultantElement = tableRes.rows[model.a].cells[model.b];
    resultantElement.className = "resultMatrixCell yellowCell";
    model.k++;
    model.r++;
  },
  displayResult: function (res) {
    var element =
      document.getElementById("resultantMatrix").firstChild.rows[model.a].cells[
        model.b
      ];
    element.innerHTML = Number(element.innerHTML) + res;
  },
  setCellValueToZero: function () {
    document.getElementById("resultantMatrix").firstChild.rows[model.a].cells[
      model.b
    ].innerHTML = 0;
  },
  resetPreviousCells: function () {
    if (model.k > 0) {
      var tableA = document.getElementById("matrixA").firstChild;
      var firstElement = tableA.rows[model.i].cells[model.k - 1];
      firstElement.className = "matrixCell blueCell";
      var tableB = document.getElementById("matrixB").firstChild;
      var secondElement = tableB.rows[model.r - 1].cells[model.q];
      secondElement.className = "matrixCell blueCell";
    }
  },
  resetPreviousRow: function () {
    if (model.i > 0) {
      var tableA = document.getElementById("matrixA").firstChild;
      for (model.i, model.j; model.j < this.colsA; model.j++)
        tableA.rows[model.i - 1].cells[model.j].className = "matrixCell";
      model.j = 0;
    }
  },
  highlightNextRow: function () {
    var tableA = document.getElementById("matrixA").firstChild;
    for (model.i, model.j; model.j < this.colsA; model.j++)
      tableA.rows[model.i].cells[model.j].className = "matrixCell blueCell";
    var tableB = document.getElementById("matrixB").firstChild;
    for (model.p, model.q; model.p < this.rowsB; model.p++)
      tableB.rows[model.p].cells[model.q - 1].className = "matrixCell";
    model.j = 0;
    model.p = 0;
  },
  resetVariablesForMatrixB: function () {
    model.b++;
    model.q++;
    model.k = 0;
    model.r = 0;
    model.j = 0;
    model.p = 0;
  },
  resetVariablesForMatrixA: function () {
    model.i++;
    model.a++;
    model.b = 0;
    model.q = 0;
  },
  resetLastCol: function () {
    if (model.i > 0) {
      var tableB = document.getElementById("matrixB").firstChild;
      for (model.p, model.q; model.p < this.rowsB; model.p++)
        tableB.rows[model.p].cells[this.colsB - 1].className = "matrixCell";
      model.p = 0;
    }
  },
  clearDivs: function () {
    document.getElementById("2-dArray").className = "hide";
    document.getElementById("matrixA").innerHTML = "";
    document.getElementById("matrixB").innerHTML = "";
    document.getElementById("resultantMatrix").innerHTML = "";
  },
  multiplyMatrices: function () {
    this.lastRedDiv = this.getLastHighlightedDiv();
    this.nextRedDiv = this.getNextDivToHighlight(this.lastRedDiv);
    var isMobile =
      window.matchMedia && window.matchMedia("(max-width: 600px)").matches;
    if (this.lastRedDiv.id === "line27") {
      if (model.i < this.rowsA) {
        this.highlightRowMatrixA();
        this.resetPreviousRow();
        this.highlightNextStep();
      } else {
        alert("Code Running Is Over !");
        this.disableButton("btnNext2D");
        this.changeClass("btnNext2D", "buttonDisable nextButton");
        this.changeClass(this.lastRedDiv.id, "show");
        this.enableButton("2DbtnOK");
        this.changeClass("2DbtnOK", "button startButton");
        if (!isMobile) {
          this.enableButton("row");
          this.enableButton("col");
        }
        document.getElementById("row").value = "";
        document.getElementById("col").value = "";
        this.changeClass("generateB", "hide");
        this.changeClass("generateA", "buttonDisable GenerateValueButton show");
        this.resetVariables();
        this.clearDivs();
      }
    } else if (this.lastRedDiv.id === "line29") {
      if (model.q < this.colsB) {
        this.resetLastCol();
        this.highlightNextColumn();
        this.highlightColMatrixB();
        this.highlightNextStep();
      } else {
        this.nextRedDiv = this.jumpTo("line37");
        this.highlightNextStep();
      }
    } else if (this.lastRedDiv.id === "line31") {
      this.setCellValueToZero();
      this.highlightNextStep();
    } else if (this.lastRedDiv.id === "line32" && model.k >= this.colsA) {
      this.nextRedDiv = this.jumpTo("line36");
      this.highlightNextStep();
      this.resetVariablesForMatrixB();
    } else if (this.lastRedDiv.id === "line34") {
      this.resetPreviousCells();
      this.highlightMatrixElements();
      var result = model.multiplyElements();
      this.displayResult(result);
      this.highlightNextStep();
    } else if (this.lastRedDiv.id === "line35") {
      this.nextRedDiv = this.jumpTo("line32");
      this.highlightNextStep();
    } else if (this.lastRedDiv.id === "line36") {
      this.nextRedDiv = this.jumpTo("line29");
      this.highlightNextStep();
    } else if (this.lastRedDiv.id === "line37") {
      this.nextRedDiv = this.jumpTo("line27");
      this.highlightNextStep();
      this.resetVariablesForMatrixA();
    } else this.highlightNextStep();
  },
  init: function () {
    this.activateEvents();
  },
};
window.onload = function () {
  view.init();
  setTimeout(function () {
    var btn = document.getElementById("2DbtnOK");
    if (btn) {
      var style = window.getComputedStyle(btn);
      var rect = btn.getBoundingClientRect();
      console.log(
        "[LOG] onload 2DbtnOK: disabled",
        btn.disabled,
        "display",
        style.display,
        "opacity",
        style.opacity,
        "pointer-events",
        style.pointerEvents,
        "rect",
        rect,
      );
    } else {
      console.log("[LOG] onload 2DbtnOK: not found");
    }
  }, 0);
};
