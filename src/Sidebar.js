import { useState } from 'react';
import './App.css';

var segment = [
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "City", value: "city" },
    { label: "State", value: "state" }
];
var usedsegment = [
    { label: "First Name", value: "first_name" },
    { label: "Account Name", value: "account_name" }
];
var passval
var change = (val) => {
    passval = val
    console.log(passval);
}

function Sidebar(props) {
    const [drop, setDrop] = useState(usedsegment);
    const [save, setSave] = useState('');
    const click = (e) => {
        e.preventDefault();
        
        if (passval) {
            let editedDrop = [...drop];
            let newSegIndex = segment.findIndex(e => e.value === passval);
            if (newSegIndex > -1) {
                editedDrop.push(segment[newSegIndex]);
                segment.splice(newSegIndex, 1);
                setDrop(editedDrop)
                Reset();
            }
        }

    }
    var usedchange = (useval, i) => {
        let editedDrop = [...drop];
        let newSegIndex = segment.findIndex(e => e.value === useval);
        if (newSegIndex > -1) {
            let changesValue = editedDrop[i];
            editedDrop[i] = segment[newSegIndex];
            segment[newSegIndex] = changesValue;
            setDrop(editedDrop)
            Reset();
            var dropDown = document.getElementById(i);
            dropDown.selectedIndex = 0;
        }
    }
    function Reset() {
        var dropDown = document.getElementById("resetdrp");
        dropDown.selectedIndex = 0;
    }
    function segsave(e) {
        e.preventDefault();
        if (save) {
            let obj = { segment_name: save, schema: drop }
            fetch("https://webhook.site/fade594d-a8db-4622-b6f2-ff75d1aa33f8", {
                "method": "POST",
                "headers": {

                },
                "body": JSON.stringify(obj)
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err);
                });
            alert("Data send to server Successfully")
        } else {
            alert("Segment name is empty")
        }

    }
    return (
        <nav>
            <header>
                <p style={{ fontSize: '24px' }}> <i className="fa fa-chevron-left" style={{ fontSize: '24px', cursor: 'pointer' }} onClick={(e) => props.setSide(false)}></i> Saving Segment</p>
            </header>
            <form>
                <div className='segmentname'>
                    <label>Enter the Name of the Segment: </label>
                    <input id="segname" value={save} onChange={(e) => setSave(e.target.value)} className='segname' type="text" placeholder='Name of the segment' />
                </div>

                <p>To save your segment, you need to add the schemas to build the query</p>

                <div className='indicator'>
                    <i className="fa fa-circle" style={{ color: 'red' }}> - Group Traits </i>
                    <i className="fa fa-circle" style={{ color: 'green' }}> - User Traits </i>
                </div>
                <div className='field'>

                    <div className='bluebox'>

                        {drop.map((op, i) =>
                            <div className="boxfield">
                                <i className="fa fa-circle" style={{ color: op.label === "Account Name" ? 'red' : 'green' }}></i>
                                <select type="text" id={i} placeholder={op.label} onChange={(e) => usedchange(e.target.value, i)}>
                                    <option>{op.label}</option>
                                    {segment.map((op) =>
                                        <option value={op.value}>{op.label}</option>
                                    )}
                                </select>
                                <i className="fa fa-minus"></i>
                            </div>
                        )}
                    </div>

                    <div className='schemename'>
                        <i className="fa fa-circle" style={{ color: '#000' }}></i>
                        <select id="resetdrp" type="text" placeholder='Account Name' onChange={(e) => change(e.target.value)}>
                            <option value="" disabled selected>Add schema to segment</option>
                            {segment.map((op) =>
                                <option value={op.value}>{op.label}</option>
                            )}
                        </select> <i className="fa fa-minus"></i>
                    </div>

                </div>
                <button className='schemabtn' onClick={(e) => click(e)}>+ Add new schema</button>

            </form>
            <footer>
                <button className='segsavebtn' onClick={(e) => segsave(e)}>Save the Segment</button>
                <button className='cancelbtn' onClick={(e) => props.setSide(false)}>Cancel</button>
            </footer>

        </nav>
    )

}

export default Sidebar;