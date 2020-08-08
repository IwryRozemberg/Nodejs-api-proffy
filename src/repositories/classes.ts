import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";
import IClassesParams from "../interfaces/classes";
import IScheduleItem from "../interfaces/classSchedule";


async function index(params: IClassesParams) {
  const timeInMinutes = convertHourToMinutes(params.time);

  return await db('classes')
    .select('classes.*', 'users.*')
    .join('users', 'user_id', 'users.id')
    .whereExists(function () {
      this.select('*')
        .from('class_schedule')
        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
        .whereRaw('`class_schedule`.`week_day` = ??', [Number(params.week_day)])
        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
    })
    .where('subject', 'like', `%${params.subject}%`);
}



// async function index(params: IClassesParams) {
//   const timeInMinutes = convertHourToMinutes(params.time);

//   const classes = await db('classes')
//     .select('classes.id as class_id', '*')
//     .join('users', 'user_id', 'users.id')
//     .whereExists(function () {
//       this.select('*')
//         .from('class_schedule')
//         .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
//         .whereRaw('`class_schedule`.`week_day` = ??', [Number(params.week_day)])
//         .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
//         .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
//     })
//     .where('subject', 'like', `%${params.subject}%`)
//     .options({ nestTables: true, rowMode: 'array' });
//   console.log(schedule);
//   return schedule;
// });

// return classes;
// }


// async function index(params: IClassesParams) {
//   const timeInMinutes = convertHourToMinutes(params.time);


//   // .select('classes.*', 'users.*', 'class_schedule.*')

//   const classes = await db('classes')
//     .select('classes.id as class_id', '*')
//     .join('users', 'user_id', 'users.id')
//     .whereExists(function () {
//       this.select('*')
//         .from('class_schedule')
//         .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
//         .whereRaw('`class_schedule`.`week_day` = ??', [Number(params.week_day)])
//         .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
//         .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
//     })
//     .where('subject', 'like', `%${params.subject}%`);

//   const classesSchedules = Array(classes.length).fill(0).map((value, i) => {
//     const classItem = { ...classes[i] };
//     const { class_id, id, name, avatar, bio, whatsapp, cost, subject } = classItem;
//     const schedule = db('class_schedule')
//       .select('*')
//       .where('class_id', '=', class_id)
//       .andWhere('week_day', '=', [Number(params.week_day)])
//       .andWhere('from', '<=', [timeInMinutes])
//       .andWhere('to', '>', [timeInMinutes]);
//     console.log(schedule);
//     return { id, name, avatar, bio, whatsapp, cost, subject, schedule };
//   });
//   classes[].map(async classItem => {

//     const { id, name, avatar, bio, whatsapp, cost, subject } = classItem;
//     // console.log({
//     //   id, name, avatar, bio, whatsapp, cost, subject, schedule
//     // });
//     return {
//       id, name, avatar, bio, whatsapp, cost, subject, schedule
//     };
//   });
// )

// console.log(classesSchedules);

//   return classesSchedules;
// }



async function create(classes: any) {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = classes;

  return await db.transaction((trx) => {
    db.insert({ name, avatar, whatsapp, bio })
      .into('users')
      .transacting(trx)
      .then(async (insertedsUsersId) => {
        const user_id = insertedsUsersId[0];
        return await db('classes')
          .insert({ subject, cost, user_id })
          .transacting(trx)
          .then((insertedIdClasses) => {
            const class_id = insertedIdClasses[0];
            const classSchedule = schedule.map((scheduleItem: IScheduleItem) => {
              return {
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
                class_id
              }
            });

            return db('class_schedule')
              .insert(classSchedule)
              .transacting(trx);
          });
      })
      .then(trx.commit)
      .catch((err) => {
        trx.rollback();
        return err;
      });
  });

}

export { index, create }