import { InputLabel, Select, TextField, makeStyles } from "@material-ui/core";
import { Alert, Button, FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { MenuItem } from "material-ui/Menu";
import { MuiThemeProvider } from "material-ui/styles";
import React from "react";

//............................Стили для компонентов............................................
const useStyles = makeStyles((theme) => ({
  FormRoot: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

const useStylesSelect = makeStyles((theme) => ({
  SelectRoot: {
    marginTop: theme.spacing(7),
  },
}));

const useStylesDate = makeStyles((theme) => ({
  Dateroot: {
    width: "100%",
    height: "150px",
    justifyContent: "center",
  },
}));
const useStylesComment = makeStyles((theme) => ({
  Commentroot: {
    margin: theme.spacing(7, 0),
  },
}));
//.............................Массивы для селекторов...........................................................
const itemsFloor = Array.from({ length: 25 }, (_, i) => i + 3);
const itemsConference = Array.from({ length: 10 }, (_, i) => i + 1);
const itemsTime = Array.from({ length: 9 }, (_, i) => i + 10);

//.........................................Сам компонент..............................................................
export const Form = ({ ...props }) => {
  //..........Стили.....................
  const stylesForm = useStyles();
  const stylesSelect = useStylesSelect();
  const stylesDate = useStylesDate();
  const stylesComment = useStylesComment();
  const [numberTower, setNumberTower] = React.useState("");
  //.............Хуки для полей форм............
  const handleChangeTower = (event) => {
    setNumberTower(event.target.value);
  };
  const [numberFloor, setNumberFloor] = React.useState("");
  const handleChangeFloor = (event) => {
    setNumberFloor(event.target.value);
  };
  const [numberConference, setNumberConference] = React.useState("");
  const handleChangeConference = (event) => {
    setNumberConference(event.target.value);
  };
  const [selectedDate, setSelectedDate] = React.useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [TimeInterval, setTimerInterval] = React.useState("");
  const handleChangeTime = (event) => {
    setTimerInterval(event.target.value);
  };

  const [comment, setComment] = React.useState("");
  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const [showWarning, setWarning] = React.useState(false);
  const [showSuccess, setSuccess] = React.useState(false);
  //функция при submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedDate === null) {
      setWarning(true);
      return;
    }
    const formattedDate = dayjs(selectedDate).format("DD-MM-YYYY");
    const data = {
      numberTower,
      numberFloor,
      numberConference,
      formattedDate,
      TimeInterval,
      comment,
    };
    setWarning(false);
    setSuccess(true);
    console.log(JSON.stringify(data, null, 2));
  };
  // функция при reset
  const handleReset = () => {
    setNumberTower("");
    setNumberFloor("");
    setNumberConference("");
    setSelectedDate(null);
    setTimerInterval("");
    setComment("");
  };
  const today = new Date();

  return (
    <MuiThemeProvider>
      <form onSubmit={handleSubmit} className={stylesForm.FormRoot} {...props}>
        {/* Варнинг выбора даты */}
        {showWarning && (
          <Alert
            onClose={() => {
              setWarning(false);
            }}
            severity="warning"
          >
            Вы не выбрали дату
          </Alert>
        )}
        {/* Сообщение успеха */}
        {showSuccess && (
          <Alert
            onClose={() => {
              setSuccess(false);
            }}
            severity="success"
          >
            Успешно! Взгляните в консоль!
          </Alert>
        )}
        {/* Поля формы*/}
        <FormControl fullWidth>
          <InputLabel fullWidth variant="standart" htmlFor="tower_number">
            Выберите башню
          </InputLabel>
          <Select
            required
            fullWidth
            name="Tower"
            labelId="tower_number"
            id="tower_number"
            value={numberTower}
            label="Выберите номер башни"
            onChange={handleChangeTower}
          >
            <MenuItem value={"А"}>A</MenuItem>
            <MenuItem value={"Б"}>Б</MenuItem>
          </Select>
          <InputLabel
            className={stylesSelect.SelectRoot}
            variant="standart"
            htmlFor="floor_number"
          >
            Выберите этаж
          </InputLabel>
          <Select
            required
            name="Floor"
            fullWidth
            labelId="floor_number"
            id="floor_number"
            value={numberFloor}
            defaultValue={null}
            label="Выберите этаж"
            onChange={handleChangeFloor}
          >
            {/* Рендер этажей в селекторе */}
            {itemsFloor.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <InputLabel
            className={stylesSelect.SelectRoot}
            variant="standart"
            htmlFor="conference_number"
          >
            Выберите переговорку
          </InputLabel>
          <Select
            name="Conference"
            required
            fullWidth
            labelId="conference_number"
            id="conference_number"
            value={numberConference}
            label="Выберите переговорку"
            onChange={handleChangeConference}
          >
            {itemsConference.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            className={stylesDate.Dateroot}
            disablePast
          />
          <InputLabel
            // className={stylesSelect.SelectRoot}
            variant="standart"
            htmlFor="floor_number"
          >
            Выберите время
          </InputLabel>
          <Select
            name="Time"
            required
            fullWidth
            labelId="time-interval"
            id="time_interval"
            value={TimeInterval}
            label="Выберите время"
            onChange={handleChangeTime}
            disabled={!selectedDate}
          >
            {/* Проверка для селектора времени */}
            {itemsTime.map((item) => {
              const isToday =
                dayjs(selectedDate).format("YYYY-MM-DD") ===
                dayjs().format("YYYY-MM-DD");
              const isDisabled = isToday && item < today.getHours();
              return (
                <MenuItem
                  disabled={isDisabled}
                  key={item}
                  value={`${item}:00-${item + 1}:00`}
                >
                  {`${item}:00-${item + 1}:00`}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            className={stylesComment.Commentroot}
            id="comment"
            value={comment}
            onChange={handleChangeComment}
            fullWidth
            multiline
            placeholder="Введите комментарий"
          />
          <Button variant="outlined" type="submit">
            Отправить
          </Button>
          <Button onClick={handleReset} type="button">
            Очистить
          </Button>
        </FormControl>
      </form>
    </MuiThemeProvider>
  );
};
