# (C) 2021 Rodolfo Lopez Pintor / Nebular Streams
# Freeware

set -e

SCRIPTDIR=$(
  cd "$(dirname "$(realpath "${0}")")" || exit 255
  pwd -P
)
PROJROOT=${SCRIPTDIR}/..
SRCROOT=${PROJROOT}/snapshot.src
OUTDIR=${PROJROOT}/snapshot.out

if [[ -d $OUTDIR ]]; then
  rm -rf $OUTDIR
fi
mkdir $OUTDIR

if [[ -z $1 ]]; then
  PLAF=osx
else
  PLAF=$1
fi

if [[ -z $2 ]]; then
  ARCH=x86_64
else
  ARCH=$2
fi

${PROJROOT}/node_modules/electron-mksnapshot/mksnapshot.js \
  ${SRCROOT}/index.js \
  --output_dir ${OUTDIR}

if [[ $1 == "osx" ]]; then
  DEST="${PROJROOT}/node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Resources"
else
  DEST="${PROJROOT}/node_modules/electron/dist"
fi

echo "- Platform $PLAF, Arch ${ARCH}"
echo "- Target folder ${DEST}"

cp "${OUTDIR}/v8_context_snapshot.bin" "${DEST}/v8_context_snapshot.${ARCH}.bin"
cp "${OUTDIR}/snapshot_blob.bin" "${DEST}/"

echo "- Snapshot binary was copied to the Electron Folder, objects should be visible in main."
echo "- you can delete folder ${OUTDIR}"
