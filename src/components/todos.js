import React, { useState, useEffect } from 'react';
import {Card} from 'antd';
import completeImg from "../../src/img/complete.png";
import editImg from "../../src/img/edit.svg.png";
import deleteImg from "../../src/img/delete.png";

const Todos = ({todos, cardsVue, completedEl, editEl, deleteEl, isShowActiveTodos,minValue, maxValue}) => {
    return (
        <>
            {todos && todos.length > 0 ? todos.filter(item => (item.completed !== isShowActiveTodos)).slice(minValue, maxValue).map(item => (
                !cardsVue  ? (
                        <li key={item.id}
                            style={{ textDecoration: item.completed && 'line-through black',
                                background: '#f0f2f5'
                            }}>
                            {item.title}
                            <div className="btnsWrapper">
                                <span onClick={() => completedEl(item.id)}>
                                    <img alt='completeImg' src={completeImg}/>
                                </span>
                                <span onClick={() => editEl(item)} className="editBtn">
                                   <img alt='editImg' src={editImg}/>
                               </span>
                                <span onClick={() => deleteEl(item.id)}>
                                       <img alt='deleteImg' src={deleteImg}/>
                               </span>
                            </div>
                        </li>
                    )
                    : (
                        <Card hoverable style={{width: '150px'}} key={item.id}>
                            <div style={{ textDecoration: item.completed ? 'line-through black' : ''}}>
                                {item.title}
                            </div>
                            <div className="btnsWrapper">
                                    <span onClick={() => completedEl(item.id)}>
                                        <img src={completeImg}/>
                                    </span>
                                <span onClick={() => editEl(item)} className="editBtn">
                                       <img src={editImg}/>
                                   </span>
                                <span onClick={() => deleteEl(item.id)}>
                                       <img src={deleteImg}/>
                                   </span>
                            </div>
                        </Card>
                    )
            )) : <p style={{textAlign: 'center', marginTop: '10px'}}>No todos!</p>
            }
        </>
    );
}

export default Todos;
