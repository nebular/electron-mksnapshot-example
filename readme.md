# electron-mksnapshot-example

A minimal electron setup in order to generate an application practically
self-contained inside a snapshot

- Electron 12
- OSX tested, WIN / LINUX may need to adjust the paths

## Instructions:

### Install deps

```
npm install

```

### Generate Snapshot

Only snapshot-osx-intel is guaranteed to work. Rest of script may have glitches in the paths.
Feel free to correct [the script](tool/mksnapshot.sh) and create a PR. 

Also, remember snapshot_blob.bin is also arch dependent although it is generated always
with the same name

```
npm run snapshot-osx-intel
npm run snapshot-osx-arm64
npm run snapshot-win
npm run snapshot-linux

```


### Run application
```
npm start
```


### Also: Test Snapshot Will work

This will print verbose errors in the JS file


```
./tool/test-snapshot.sh snapshot.src/index.js

```


## Structure

- [snapshot.src/](snapshot.src)
  - [index.js](snapshot.src/index.js)
     - the snapshot file that will be compiled. This is executed on a totally blank V8 context, no windows, no nodejs,
       no dom .... You need to use closures and instance later from the real things.

- [snapshot.out/](snapshot.out)
  - binary files will be generated here AND copied to node-modules/electron/dist.... You can delete this folder.

- [stub/](stub)
  - A stub main and preloader that load all code from the snapshots

- [html/](html)
  - An HTML application that loads all code from the snapshot


# Freeware

(C) 2021 Rodolfo Lopez / Nebular Streams
Freeware

Thanks a lot to [@jkleinsc](https://github.com/jkleinsc) for his comprehensive help to get this working.
