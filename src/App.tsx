import { useEffect} from "react";

import { observer } from "mobx-react-lite";
import { store } from "./store";
import AddLocationForm from './components/add-location-form/add-location-form.component'
import style from './app.module.css'

export default observer(function App() {

  const { isLoaded, fetchData } = store

  useEffect(()=>{
    fetchData()
  }, [fetchData])

  return (
    <div className={style.app}>
      { isLoaded ? <AddLocationForm/>:<h1>Идет загрузка</h1> }
    </div>
  );
})
