from peewee import *

dbCalendar = SqliteDatabase('ServerSystem/dbs/calendar.db')
dbHistory = SqliteDatabase('ServerSystem/dbs/history.db')


class CalendarModel(Model):
    class Meta:
        database = dbCalendar


class HistoryModel(Model):
    class Meta:
        database = dbHistory


class Calendar(CalendarModel):
    id = AutoField(unique=True)
    day = IntegerField()
    startPeriod = TimeField()
    endPeriod = TimeField()
    grade = CharField()


class History(HistoryModel):
    id = AutoField(unique=True)
    visitedOn = DateField()
    computerId = IntegerField()
    url = CharField()
    website = CharField()
    title = CharField()


def initialize_db_Calendar():
    dbCalendar.connect()
    dbCalendar.create_tables([Calendar], safe=True)
    dbCalendar.close()


def initialize_db_History():
    dbHistory.connect()
    dbHistory.create_tables([History], safe=True)
    dbHistory.close()


def deleteConflictingDates(day, startPeriod, endPeriod):
    roomTakenHours = Calendar.select().where(Calendar.day == day)
    for hour in roomTakenHours:
        if not (hour.endPeriod < startPeriod or hour.startPeriod > endPeriod):
            print("deleting record:" + str(hour.id) + " for grad:" + str(hour.grade) + " from " + str(
                hour.startPeriod) + " to " + str(hour.endPeriod))
            Calendar.delete().where(id == hour.id).execute()


def addCalendarEntry(day, startPeriod, endPeriod, grade):
    try:
        dbCalendar.connect()
    except:
        pass
    deleteConflictingDates(day, startPeriod, endPeriod)
    Calendar.create(day=day, startPeriod=startPeriod, endPeriod=endPeriod, grade=grade)


def addHistoryEntry(visitedOn, computerId, url, website, title):
    try:
        dbHistory.connect()
    except:
        pass
    History.create(visitedOn=visitedOn, computerId=computerId, url=url, website=website, title=title)


def getHistoryEntries(page):
    list = []
    dict = {}
    for entry in History.select().order_by(History.id).paginate(page, 10):
        dict['id'] = entry.id
        dict['visitedOn'] = entry.visitedOn
        dict['computerId'] = entry.computerId
        dict['url'] = entry.url
        dict['website'] = entry.website
        dict['title'] = entry.title
        dict2=dict.copy()
        list.append(dict2)
        dict.clear()
    return list


if __name__ == '__main__':
    initialize_db_Calendar()
    initialize_db_History()
