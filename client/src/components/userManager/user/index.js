import React, { useState, useEffect } from "react";
import Button from "./button";
import axios from "axios"
import {updateMethod, deleteMethod} from "../../../api"
function User(props) {
    const {
        setUserListContext = () => {},
        _id = "",
        name = "",
        username = "",
        password = "",
        age = 10,
        gender = "male",
        isAdmin = false,
        isDeleted = false
    } = props
    const [userData, setUserData] = useState(props)
    const [isEditting, setEditting] = useState('none');
    const [isSoftDeleted, setSoftDeleted] = useState('');
    const [edittingData, setEdittingData] = useState({
      _id : _id,
      name: name,
      age: age,
      gender: gender,
      isAdmin: isAdmin,
    })

    useEffect(()=>{
      setSoftDeleted(isDeleted)
    }, [isDeleted])

    function handleRemove(){
        setSoftDeleted('none')
    }

    function handleEditField(text, field){
      switch(field){
        case "name": 
          setEdittingData(prevState => ({
            ...prevState,
            name: text
        }))
          break;
        case "age":
          setEdittingData(prevState => ({
            ...prevState,
            age: text
        }))
          break;
        case "gender":
          setEdittingData(prevState => ({
            ...prevState,
            gender: text
        }))
          break;
        case "role":
          setEdittingData(prevState => ({
            ...prevState,
            isAdmin: text
        }))
          break;
      }
    }

    function handleEdit(){
      setEditting("")
    }

    function handleFinishEdit(){
      setEditting("none")
    }


    function handleDeleteAccount(id) {
      deleteMethod('delete-user', { _id: id })
      .then(
          response => {
          }
      )
      handleRemove()
      handleFinishEdit()
    }

    function handleEditAccount(update, id) {
      setEdittingData()
      if(update.isAdmin){
        if(update.isAdmin == "Admin"){
          update.isAdmin = true
        } else {
          update.isAdmin = false
        }
      }
      
      updateMethod('edit-user', update)
      .then(
          response => {
            handleFinishEdit()
            setUserData(prevState => ({
              ...prevState,
              name: update.name,
              age: update.age,
              gender: update.gender,
              isAdmin: update.isAdmin
            }))
          }
      )
    }



    return (
      <React.Fragment>
        <tr
          className = {username}
          style = {{display: isSoftDeleted}}
        >
          <td className = "id">
            {userData._id}
          </td>
          <td className = "name">
            {userData.name}
            <br/>
            <input
              className = "name__editField"
              defaultValue={name}
              style={{display: isEditting}}
              onChange = {e => handleEditField(e.target.value, "name")}
            >
            </input>
          </td>
          <td className = "username">
            {userData.username}
          </td>
          <td className = "password">
            {userData.password}
          </td>
          <td className = "age">
            {userData.age}
            <br/>
            <input
              className = "age__editField"
              defaultValue={age}
              style={{display: isEditting}}
              onChange = {e => handleEditField(e.target.value, "age")}
            >
            </input>
          </td>
          <td className = "gender">
            {userData.gender}
            <br/>
            <input
              className = "gender__editField"
              defaultValue={gender}
              style={{display: isEditting}}
              onChange = {e => handleEditField(e.target.value, "gender")}
            >
            </input>
          </td>
          <td className = "role">
            {(userData.isAdmin == false) && (
              "User"
            )}
            {(userData.isAdmin == true) && (
              "Admin"
            )}
            <br/>
            <input
              className = "role__editField"
              defaultValue= "User"
              style={{display: isEditting}}
              onChange = {e => handleEditField(e.target.value, "role")}
            >
            </input>
          </td>
          <td className = "checkbox">
            {(isEditting == "none") && (
            <input
              type= "button"
              className = 'checkbox-round'
              onClick={handleEdit}
            />
            )}
            {(isEditting == "") && (
                <div className="user__options">
                  <Button
                      titleValue="Delete"
                      id="delete__button"
                      handleOnClick={e => handleDeleteAccount(_id)}
                  />
                  <Button
                      titleValue="Edit"
                      id="edit__button"
                      handleOnClick={e => handleEditAccount(edittingData, _id)}
                  />
                  <Button
                      titleValue="Cancel"
                      id="cancel__button"
                      handleOnClick={e => setEditting("none")}
                  />
                  
                </div>
            )}
          </td>
          
        </tr>

        </React.Fragment>
    )
}


export default User
