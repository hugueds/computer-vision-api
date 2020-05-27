class SystemController():

    counter = 0

    def __init__(self):
        pass

    def index(self):
        self.counter += 1
        return 'Home Controller ' + str(self.counter)

    def test(self):
        return 'Test'


system_controller = System()