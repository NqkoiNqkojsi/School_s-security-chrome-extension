from peewee import *


dbCalendar = SqliteDatabase('BrowserExtensionServer/dbs/calendar.db')
dbHistory = SqliteDatabase('BrowserExtensionServer/dbs/history.db')

class CalendarModel(Model):
    class Meta:
        database = dbCalendar
class HistoryModel(Model):
    class Meta:
        database = dbHistory


class Calendar(CalendarModel):
    id=AutoField(unique=True)
    day = IntegerField()
    startPeriod=IntegerField()
    endPeriod=IntegerField()
    grade=CharField()

class History(HistoryModel):
    id=AutoField(unique=True)
    visitedOn = DateField()
    computerId=IntegerField()
    url=CharField()
    website=CharField()
    title=CharField()



def initialize_db_Calendar():
    dbCalendar.connect()
    dbCalendar.create_tables([Calendar], safe=True)
    dbCalendar.close()

def initialize_db_History():
    dbHistory.connect()
    dbHistory.create_tables([History], safe=True)
    dbHistory.close()



def deleteConflictingDates(day, startPeriod, endPeriod):
    roomTakenHours=Calendar.select().where(Calendar.day==day)
    for hour in roomTakenHours:
        if not(hour.endPeriod<startPeriod or hour.startPeriod>endPeriod):
            print("deleting record:"+str(hour.id)+" for grad:"+str(hour.grade)+" from "+str(hour.startPeriod)+" to "+str(hour.endPeriod))
            Calendar.delete().where(id==hour.id).execute()


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


if __name__ == '__main__':
    initialize_db_Calendar()
    initialize_db_History()
    addCalendarEntry(1, 2, 4, "12d")
    addHistoryEntry("", 1, "Url", "web", "test")