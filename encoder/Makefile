serve:
	python -m http.server 80 -d dist/

build:
	npm run build

ifeq ($(OS), Windows_NT)
clean:
	powershell "rm -r dist/"
else
clean:
	rm -r dist/
endif
