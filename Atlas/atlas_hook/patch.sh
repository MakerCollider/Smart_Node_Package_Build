CMD="require('./atlas_hook').hook(app, server, express);"
echo "patching... $FILE"

if grep atlas_hook $1 
then
  echo "has already patched"
else
  echo $CMD >> $1
fi

echo done
