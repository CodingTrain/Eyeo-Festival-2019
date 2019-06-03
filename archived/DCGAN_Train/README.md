```
pip install tensorflow
pip install image
pip install chainer
python datatool.py --task dir_to_npz --dir_path images --npz_path npzdata/img_rainbow_png_64.npz --size 64
python chainer_dcgan.py --arch dcgan64 --image_size 64 --adam_alpha 0.0001 --adam_beta1 0.5 --adam_beta2 0.999 --lambda_gp 1.0 --learning_rate_anneal 0.9 --learning_rate_anneal_trigger 0 --learning_rate_anneal_interval 5000 --max_iter 100000 --snapshot_interval 5000 --evaluation_sample_interval 100 --display_interval 10 --npz_path npzdata/img_rainbow_png_64.npz --out out_chainer_dcgan64
```