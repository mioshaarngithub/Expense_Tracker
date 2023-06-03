import React, { useEffect, useState } from 'react'

const getDatafromLS = () =>{
    const data = localStorage.getItem('transs');
    
    if(data){
        return JSON.parse(data);
    }
    else{
        return []
    }
}


function ExpencesTracker() {
    const [transs, settrans] = useState(getDatafromLS());

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [transaction, setTransaction] = useState([]);
    const [editId, setEditId] = useState();

    const addTransaction = (e) => {
        e.preventDefault();

        let trans={
            description,
            amount,
            date
        }
        settrans([...transs, trans]);
        setDescription('');
        setAmount('');
        setDate('');
    

        if (editId) {
            const newTransaction = transs.map((t) => (
                t.id === editId ? { id: editId, description, amount, date } : t
            ))
            settrans(newTransaction);
            setEditId(newTransaction);
            setDate(newTransaction);
        }
        else {
            settrans([...transs, { id: Date.now(), description, amount, date }])
        }
        setDescription('');
        setAmount('');
        setDate('');
    }
    const handleEdit = (t) => {
        setEditId(t.id);
        setDescription(t.description);
        setAmount(t.amount);
        setDate(t.date);
    }
    const handleDelete = (id) => {
        settrans(transs.filter(t => t.id !== id))
    }

    useEffect(()=>{
        localStorage.setItem('transs',JSON.stringify(transs))
    },[transs])


    return (
        <div class=''>
            <h1>Expence Tracker</h1>
            <div>
                `{transs.length > 0 && 
                    <div  >
                    <h2>Transactions</h2>
                    <table className='table'>
    
                        <thead >
                            <th className='card1' >Description</th>
                            <th className='card1' >Amount</th>
                            <th className='card1' >Date</th>
                            <th className='card1' >Action</th>
    
                        </thead>
                        <tbody>
                            {transs.map((t) => (
                                <tr key={t.id} >
                                    <td>{t.description}</td>
                                    <td>{t.amount}</td>
                                    <td>{t.date}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={e => handleEdit(t)}>Edit</button>
                                        <button className='btn btn-primary' onClick={e => handleDelete(t.id)}>Delete</button>
    
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
                }
                {transs.length <1 && <div>No Transaction added Yet</div>}
            
            </div>

            
            <div className='card2'>
                <h1>Add Your Transaction</h1>
            </div>

            <form onSubmit={addTransaction}>
                <input  type='text' placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
                <input  type='number' placeholder='Amount' value={amount} onChange={e => setAmount(e.target.value)} />
                <input  type='date'  value={date} onChange={e => setDate(e.target.value)} />
                
                <button className='btn btn-success'>Add Transaction</button>
            </form>

        </div >
    )
}

export default ExpencesTracker