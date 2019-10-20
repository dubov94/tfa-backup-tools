default:
	npm run build
	python -m http.server 80 -d dist/

ifeq ($(OS), Windows_NT)
clean:
	powershell "rm -r dist/"
else
clean:
	rm -r dist/
endif
