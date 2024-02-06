import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
//rce 밑에처럼 만들어주는 단축기

const App = () => {
  // constructor(props) {
  //   super(props);
  //   this.state={
  //     expenses : [
  //       {id :1, charge:'점심', amount:50000},
  //       {id :2, charge:'주유', amount:40000},
  //       {id :3, charge:'저녁', amount:40000}
  //     ]
  //   }
  // }

  // initialExpenses=[
  //   {id :1, charge:'점심', amount:50000},
  //   {id :2, charge:'주유', amount:40000},
  //   {id :3, charge:'저녁', amount:40000}
  // ]
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState('');
  const [alert, setAlert] = useState({show:false});
  const [edit, setEdit] = useState(false);

        // 변수명 //변수를 저장하는 함수
  const [expenses,setExpenses] = useState([
    {id :1, charge:'점심', amount:50000},
    {id :2, charge:'주유', amount:40000},
    {id :3, charge:'저녁', amount:40000}
  ])

  const addCharge = (e) => {
    //console.log(e.target.value);
    setCharge(e.target.value);
  }
  const addAmount = (e) => {
    console.log(typeof e.target.valueAsNumber);
    setAmount(e.target.valueAsNumber);
  }
  // 수정
  const editExpense = (id) => {
    const expense = expenses.find(item => item.id === id);
    const {charge,amount} = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true); 
  }
  // 삭제
  const clearExpense = (id) => {
    const newExpense = expenses.filter(expense => expense.id !== id)
    // this.setState({expenses:newExpense});
    setExpenses(newExpense);
    handleAlert({type:'danger',text:'항목이 삭제되었습니다.'})
  }
  const handleAlert = ({type,text}) => {
    setAlert({show:true,type,text});
    setTimeout(() => {
      setAlert({show:false});
    }, 3000);
  }
  const expenseSubmit = (e) => {
    e.preventDefault(); // 기본 동작을 막아주는 역할(새로고침X)
    if(charge !== "" && amount > 0) {
      if(edit){ 
        const newExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })
        //console.log("newExpenses >> " ,newExpenses)
        setExpenses(newExpenses);
        setEdit(false);
        setCharge('');
        setAmount(0);
        handleAlert({type:'success', text:'수정이 완료되었습니다.'});
      }else {
        const newExpense = {id : crypto.randomUUID(), charge,amount}
        const newExpenses = [...expenses , newExpense];
        setExpenses(newExpenses);
        setCharge("");
        setAmount(0);
        handleAlert({type:'success',text:"항목이 추가되었습니다."})
      }
    }else {
      console.log("error");
      handleAlert({type:'danger', text:'데이터를 입력해주세요.'})
      return false;
    }
  }
  const clearItems = () => {
    setExpenses([]);
  }
    return (
      <main className="main-container">
        {alert.show?<Alert type={alert.type} text={alert.text} /> : null}
        <h1>예산계산기</h1>
        <div  className="box">
          <ExpenseForm 
            addCharge={addCharge}
            charge={charge}
            addAmount={addAmount}
            amount={amount}
            expenseSubmit={expenseSubmit}
            edit={edit}
          />
        </div>
        <div  className="box">
          <ExpenseList 
            expenses={expenses} 
            clearExpense={clearExpense}
            editExpense={editExpense} 
            clearItems={clearItems}
          />
        </div>
        <div  className="box2"> 
          <p className="t_price">총지출: 
            <span>{expenses.reduce((acc,curr) =>{
                  return (acc += curr.amount);
              },0)}원
            </span>
          </p>
        </div>
      </main>
    )
  }




export default App;