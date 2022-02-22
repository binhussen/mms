import notifyTableState from "../notify/notify.table";
import damagesForm from "./damages.form";
import damagesTableState from "./damages.table";

const damagesPage = {
    title: 'Damages',
    type: 'default page',
    form: damagesForm.damagesForm,
    table: damagesTableState,
  };
  
  export default damagesPage;