import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import React from "react";
import { Form, Header, MainContainer } from './components';
dayjs.locale('ru');


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru">
      <Header />
      <MainContainer>
        <Form />
      </MainContainer>
    </LocalizationProvider>
  );
}

export default App;





















































































console.log(`
____________________
___000000___00000___
__00000000_0000000__
__0000000000000000__
___00000000000000___
_____00000000000____
________00000_______
__________0_________
`);