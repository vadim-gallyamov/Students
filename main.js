
const studentsList = [{
  name:'Руслан',
  lastname: "Кашапов",
  surname: "Азатович",
  datebth: new Date(2001, 6, 22),
  facult: "Информатика",
  datein: '2019',
},
{
  name:'Никита',
  lastname: "Русаков",
  surname: "Станиславович",
  datebth: new Date(2001, 3, 13),
  facult: "Математика",
  datein: '2019',
},
{
  name:'Алексей',
  lastname: "Зеленов",
  surname: "Владимирович",
  datebth: new Date(2002, 4, 26),
  facult: "Русский язык",
  datein: '2017',
},
{
  name:'Булат',
  lastname: "Хуснуриялов",
  surname: "Алексеевич",
  datebth: new Date(2003, 6, 24),
  facult: "Информатика",
  datein: '2021',
},
{
  name:'Арслан',
  lastname: "Ахтямов",
  surname: "Альбертович",
  datebth: new Date(1999, 3, 14),
  facult: "Робототехника",
  datein: '2017',
}
]

function formatDate(date){
  var dd = date.getDate();
  if (dd < 10) dd='0' + dd;
  var mm = date.getMonth() + 1;
  if (mm < 10) mm= '0' + mm;
  var yy = date.getFullYear();
  if (yy < 10) yy= '0' + yy;
  return dd + '.' + mm + '.' + yy;
}


function getStudentItem(studentObj) {
  const newTr = document.createElement("tr")
  const newTdFIO = document.createElement("td")
  const newTddatebth = document.createElement("td")
  const newTdFacult = document.createElement("td")
  const newTdDatein = document.createElement("td")

  newTdFIO.textContent = `${studentObj.lastname} ${studentObj.name} ${studentObj.surname}`
  newTddatebth.textContent = formatDate(studentObj.datebth)
  newTdFacult.textContent = studentObj.facult
  newTdDatein.textContent = titleLearn(studentObj.datein);
  function titleLearn(datein) {
    let now = new Date();
    let yearEnd = parseInt(datein) + 4;
    if ((now.getMonth() + 1 > 8 && yearEnd === now. getFullYear()) || yearEnd < now.getFullYear()){
      return (`${datein}-${yearEnd}(закончил)`);
    }
    else {
      return (`${datein}-${yearEnd}(${now.getFullYear() - datein} курс)`);
    }}
  newTr.append(newTdFIO, newTddatebth, newTdFacult, newTdDatein)
  return newTr
}


let sortColumnFlag = 'fio',
    sortDirFlag = true
const newThFIO = document.getElementById("sort__fio");
const newThAge = document.getElementById("sort__age");
const newThFaculty = document.getElementById("sort__faculty");
const newThDatapost = document.getElementById("sort__datapost");
const filterForm = document.getElementById("filter__form");
const filterFIO = document.getElementById("filter__fio");
const filterDatabth = document.getElementById("filter__databth");
const filterFacult = document.getElementById("filter__facult");
const filterDatein = document.getElementById("filter__datein");



function renderStudentsTable(studentsArray) {
  let copyArr = [...studentsArray]

  const $studentTable = document.getElementById("student-table")
  for(const user of copyArr){
    user.fio = user.name + ' ' + user.surname + ' ' + user.lastname
  }
 copyArr = copyArr.sort(function(a, b){
    let sort = a[sortColumnFlag] < b[sortColumnFlag]
    if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
    if (sort) return -1
  })
  copyArr = copyArr.sort(function(a, b){
    let sortbth = a.datebth < b. datebth
    if (sortDirFlag == false) sortbth = a.datebth > b.datebth
    if (sortbth)   return -1
  })

  if (filterFIO.value.trim() !== ""){
    copyArr = copyArr.filter(function(user){
      if (user.fio. includes(filterFIO.value.trim())) return true
    });
  }
  if (filterDatabth.value.trim() !== ""){
    copyArr = copyArr.filter(function(user){
      if (user.datein. includes(filterDatabth.value.trim())) return true
    });
  }
  if (filterDatein.value.trim() !== ""){
    copyArr = copyArr.filter(function(user){
      if (`${+user.datein + 4}`. includes(filterDatein.value.trim())) return true
    });
  }
  if (filterFacult.value.trim() !== ""){
    copyArr = copyArr.filter(function(user){
      if (user.facult. includes(filterFacult.value.trim())) return true
    });
  }

  $studentTable. innerHTML = ''
  for (const studentObj of copyArr){
    const newTr1 = getStudentItem(studentObj)
    $studentTable.append(newTr1)
  }
}
renderStudentsTable(studentsList)

document.getElementById("add-form").addEventListener("submit", function(event){
  event.preventDefault()
  let newStudentObj = {
    name: document.getElementById("name-input").value,
    lastname: document.getElementById("lastname-input").value,
    surname: document.getElementById("surname-input").value,
    datebth: new Date(document.getElementById("datebth-input").value),
    facult: document.getElementById("facult-input").value,
    datein: document.getElementById("datein-input").value,
  }
  var currentYear = new Date().getFullYear();

  if (newStudentObj.name.trim() == ""){
    alert('Имя не введено')
    return
  }
  if (newStudentObj.lastname.trim() == ""){
    alert('Фамилия не введена')
    return
  }
  if (newStudentObj.surname.trim() == ""){
    alert('Отчество не введено')
    return
  }

  if (newStudentObj.facult.trim() == ""){
    alert('Факультет не введен')
    return
  }
  if (newStudentObj.datein.trim() == ""){
    alert('Дата поступления не введена')
    return
  }
  function isValidDate(datebth){
    const minDate = new Date(1900, 0, 1);
    const maxDate = new Date();
    return datebth >= minDate && datebth <= maxDate;
  }
  if (!isValidDate(newStudentObj.datebth)) {
    alert("Дата рождения введена некорректно");
    return;
 }

  if (newStudentObj.datein.trim() < 2000 ||  newStudentObj.datein.trim() > currentYear) {
    alert('Дата поступления должна быть от 2000 до текущего года')
    return
  }
  studentsList.push(newStudentObj)
  renderStudentsTable(studentsList)
})

newThFIO.addEventListener('click', function(){
  sortColumnFlag = 'fio'
  sortDirFlag = !sortDirFlag
  renderStudentsTable(studentsList)
})
newThFaculty.addEventListener('click', function(){
  sortColumnFlag = 'facult'
  sortDirFlag = !sortDirFlag
  renderStudentsTable(studentsList)
})
newThAge.addEventListener('click', function(){
  sortColumnFlag = 'databth'
  sortDirFlag = !sortDirFlag
  renderStudentsTable(studentsList)
})

newThDatapost.addEventListener('click', function(){
  sortColumnFlag = 'datein'
  sortDirFlag = !sortDirFlag
  renderStudentsTable(studentsList)
})

if (filterFIO.value.trim() !== ""){
  copyArr = copyArr.filter(function(user){
    if (user.fio.includes(filterFIO.value.trim())) return true
  });
}

if (filterDatabth.value.trim() !== ""){
  copyArr = copyArr.filter(function(user){
    if (user.fio.includes(filterDatabth.value.trim())) return true
  });
}

if (filterFacult.value.trim() !== ""){
  copyArr = copyArr.filter(function(user){
    if (user.fio.includes(filterFacult.value.trim())) return true
  });
}
if (filterDatein.value.trim() !== ""){
  copyArr = copyArr.filter(function(user){
    if (user.fio.includes(filterDatein.value.trim())) return true
  });
}



filterForm.addEventListener('submit', function(event){
  event.preventDefault()
})

filterFIO.addEventListener('input', function(){
  renderStudentsTable(studentsList)
})
filterDatabth.addEventListener('input', function(){
  renderStudentsTable(studentsList)
})

filterFacult.addEventListener('input', function(){
  renderStudentsTable(studentsList)
})

filterDatein.addEventListener('input', function(){
  renderStudentsTable(studentsList)
})


