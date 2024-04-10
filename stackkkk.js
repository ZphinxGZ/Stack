class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  push(element) {
    this.items[this.count] = element;
    console.log(`${element} Added to ${this.count}`);
    this.count += 1;
    return this.count - 1;
  }

  pop() {
    if (this.count == 0) return undefined;
    let deleteItem = this.items[this.count - 1];
    this.count -= 1;
    console.log(`${deleteItem} Removed to ${this.count}`);
    return deleteItem;
  }

  peek() {
    console.log(`Top element is ${this.items[this.count - 1]}`);
    return this.items[this.count - 1];
  }

  isEmpty() {
    console.log(this.count == 0 ? `Stack is Empty` : `Stack is NOT empty`);
    return this.count == 0;
  }

  size() {
    console.log(`${this.count} element is Stack`);
    return this.count;
  }

  print() {
    let str = "";
    for (let i = 0; i < this.count; i++) {
      str += this.items[i] + " ";
    }
    return str;
  }

  clear() {
    this.items = [];
    this.count = 0;
    console.log(`Stack Cleared...`);
    return this.items;
  }
}

function displayData() {
  let ele = document.getElementById("dataInput").value;
  let re = document.getElementById("output");

  let postfix = infixToPostfix(ele);
  let infix = postfixToInfix(postfix);
  let result = sumData(postfix);

  re.innerHTML = `<p class="pp">Postfix to Infix:  <span>${infix}</span></p>
<p class="pp">Infix to Postfix:  <span>${postfix}</span></p>
<p class="pp">Sum:  <span>${result.toFixed(2)}</span></p>`;
}

function infixToPostfix(infixEle) {
  let stack = new Stack();
  let postfix = "";

  for (let i = 0; i < infixEle.length; i++) {
    let char = infixEle[i];
    if (char === " ") continue;
    if (checkOperand(char)) {
      postfix += char;
    } else if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      while (!stack.isEmpty() && stack.peek() !== "(") {
        postfix += stack.pop();
      }
      stack.pop(); // Remove '('
    } else {
      while (
        !stack.isEmpty() &&
        checkPriority(stack.peek()) >= checkPriority(char)
      ) {
        postfix += stack.pop();
      }
      stack.push(char);
    }
  }

  while (!stack.isEmpty()) {
    postfix += stack.pop();
  }

  return postfix;
}

function postfixToInfix(postfixEle) {
  let stack = new Stack();

  for (let i = 0; i < postfixEle.length; i++) {
    let char = postfixEle[i];

    if (char === " ") continue;

    if (checkOperand(char)) {
      stack.push(char);
    } else {
      let operand2 = stack.pop();
      let operand1 = stack.pop();
      let infix = `(${operand1}${char}${operand2})`;
      stack.push(infix);
    }
  }

  return stack.pop();
}

//ใช้สำหรับคำนวณค่าของนิพจน์ที่กำหนดให้ในรูปแบบ postfix
function sumData(postfixEle) {
  let stack = new Stack();

  for (let i = 0; i < postfixEle.length; i++) {
    let char = postfixEle[i];
    if (checkOperand(char)) {
      stack.push(parseInt(char));
    } else if (checkOperator(char)) {
      let operand2 = stack.pop();
      let operand1 = stack.pop();
      let result;
      switch (char) {
        case "+":
          result = operand1 + operand2;
          break;
        case "-":
          result = operand1 - operand2;
          break;
        case "*":
          result = operand1 * operand2;
          break;
        case "/":
          result = operand1 / operand2;
          break;
        case "^":
          result = Math.pow(operand1, operand2);
          break;
      }
      stack.push(result);
    }
  }
  return stack.pop();
}
// ฟังก์ชันตรวจสอบว่าตัวอักษรเป็นตัวเลขหรือตัวอักษรทั่วไป
function checkOperand(char) {
  return (
    (char >= "a" && char <= "z") ||
    (char >= "A" && char <= "Z") ||
    (char >= "0" && char <= "9")
  );
}

// ฟังก์ชันตรวจสอบว่าตัวอักษรเป็นตัวดำเนินการทางคณิตศาสตร์
function checkOperator(char) {
  return (
    char === "+" || char === "-" || char === "*" || char === "/" || char === "^"
  );
}

// ฟังก์ชันตรวจสอบความสำคัญ
function checkPriority(operator) {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    case "^":
      return 3;
    default:
      return 0;
  }
}

//AB+C*D/EF^+G/
//12+3*4/56^+7

//(((A + B) * C) / D + E ** F) / g;
//(((1 + 2) * 3) / 4 + 5 ** 6) / 7;
//(1 + (2 * 3) / 4 + 5) ^ (6 / 7);


//((1+2)*3/4+5**6)/7
//1+2*3/4+5^6/7
