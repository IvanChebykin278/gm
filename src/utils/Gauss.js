export default function Gauss() {
	let ready = false;
	let second = 0.0;
	
	this.next = function(mean, dev) {
		mean = mean == undefined ? 0.0 : mean;
		dev = dev == undefined ? 1.0 : dev;
		
		if (this.ready) {
			this.ready = false;
			return this.second * dev + mean;
		}
		else {
			var u, v, s;
			do {
				u = 2.0 * Math.random() - 1.0;
				v = 2.0 * Math.random() - 1.0;
				s = u * u + v * v;
			} while (s > 1.0 || s == 0.0);
			
			var r = Math.sqrt(-2.0 * Math.log(s) / s);
			this.second = r * u;
			this.ready = true;
			return r * v * dev + mean;
		}
	};
};