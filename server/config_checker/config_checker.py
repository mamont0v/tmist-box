from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class MyHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.is_directory:
            return None
        else:
            with open(event.src_path, 'r') as f:
                file_contents = f.read()
                if 'Java=on' in file_contents:
                    print("Java is on")

                elif 'Java=off' in file_contents:
                    print("Java is off")
                else:
                    print("Java is not set")


if __name__ == "__main__":
    event_handler = MyHandler()
    observer = Observer()
    observer.schedule(event_handler, path='C://Users//wanna//OneDrive//Рабочий стол//Work//projectx//config_checker//', recursive=False)
    observer.start()
    try:
        while True:
            observer.join()
    except KeyboardInterrupt:
        observer.stop()
    observer.join()