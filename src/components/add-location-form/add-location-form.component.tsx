import { ChangeEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import style from './add-location-form.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEye, faLeaf, faLocationDot, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Input from '../input/input.component'

import { observer } from "mobx-react-lite";
import { store,  Server } from "../../store";

export default observer(function AddLocationForm():JSX.Element{

  const {locations, envs, servers, addTestLocation, testLocations} = store

  const [locationId, setLocationId] = useState<number>(locations[0]?.locationID)
  const [envId, setEnvId] = useState<number>(envs[0]?.envID)
  const [availableServers, setAvailableServers] = useState<Server[]>([])

  const onLocationChange = (event:ChangeEvent<HTMLSelectElement>)=>{
    console.log('event.target.value from onChangeLocation:', event.target.value)
    const locationId = locations.find(location=>location.name===event.target.value)?.locationID
    console.log('locationId from onLocationChange:', locationId)
    if (locationId) setLocationId(locationId)
  }

  const onEnvChange = (event:ChangeEvent<HTMLSelectElement>)=>{
    const envId = envs.find(env=>env.name===event.target.value)?.envID
    if (envId) setEnvId(envId)
  }

  useEffect(()=>{
    console.log('locationId:', locationId)
    console.log('envID:', envId)
    console.log('servers:', servers)
    const x = servers.filter(server=>server.locationID===locationId && server.envID===envId)
    console.log('server after filter:', x.map(el=>el.name))
      setAvailableServers(servers.filter(server=>server.locationID===locationId && server.envID===envId))
  }, [locationId, envId, servers])

  const addTestLocationClick = ()=>{
    addTestLocation({
      testLocationId: uuidv4(),
      locationID: locationId,
      envID: envId,
      serverIDs: availableServers.map(server=>server.serverID)
    })
    alert('Вы успешно добавили новую тестовую локацию')

  }

  const onShowResultClick = ()=>{
    const result = testLocations.map(location=>( { 
      envID:location.envID,
      locationID:location.envID,
      hint: location.hint
    }))
    console.log('result:', result)
    alert('Массив тестовых локаций выведен в консоле')
  }

  return (
    <div className={style.wrapper}> 

      <div className={style.form}>
        <div className={style.header}>
          <div className={style.iconAndLabel}>
            <FontAwesomeIcon icon={faPen} size='xl'/>
            <span> Тестовая локация</span>
          </div>
        <FontAwesomeIcon icon={faTrash} size='xl' className={style.deleteBtn}/>
        </div>

        <div className={style.main}>

          <div className={style.selectAndLabel}>
            <span> Локация </span>
            <label className={style.customSelect}>
              <select className={style.select} onChange={onLocationChange}>
                {locations.map(location=>(<option key={location.locationID}> {location.name} </option>))}
              </select>
              <FontAwesomeIcon icon={faLocationDot} size='lg' className={style.customElement}/>
            </label>
          
          </div>

          <div className={style.selectAndLabel}>
            <span> Среда </span>
            <label className={style.customSelect}> 
              <select className={style.select} onChange={onEnvChange}>
                {envs.map(env=>(<option key={env.envID}> {env.name} </option>))}
              </select>
              <FontAwesomeIcon icon={faLeaf} flip="horizontal" size='lg' className={style.customElement}/>
            </label>
          </div>

          <div className={style.selectAndLabel}>
            
            <label className={style.servers}>
              Серверы: 
            </label>
            
            <div>
              <FontAwesomeIcon icon={faBars} size='lg'/>
              {availableServers.length> 0  ? 
                availableServers.map(server=>{
                  return (<span key={server.serverID}> {server?.name}</span>)
                }) 
                :
                  <span> Нет доступных серверов</span>
                }
            </div>
           
          </div>
        </div>
        <Input/>
      </div>

      <div className={style.btnBlockWrapper}>
        <button onClick={addTestLocationClick} className={style.btnBlockItem}> 
          <FontAwesomeIcon icon={faPlus} size='2xl' className={style.iconSvg}/>
          <span> Добавить тестовую локацию  </span>
        </button>
        <button onClick={onShowResultClick} className={style.btnBlockItem} >
            <FontAwesomeIcon icon={faEye} size='2xl' className={style.iconSvg}/>
            <span> Вывести результат в консоль  </span> 
        </button>
      </div> 

    </div>  
  )
})
