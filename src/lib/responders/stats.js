const os = require('os');

const v8 = require('v8');

const helpers = require('../helpers');

let stats = {};

stats.respond = function(){
  
  helpers.setHeader('SYSTEM STATISTICS');
	
  // Compile an object of stats
  const stats = {

    	'Load Average' : os.loadavg().join(' '),

    	'CPU Count' : os.cpus().length,

    	'Free Memory' : os.freemem(),

    	'Current Malloced Memory' : v8.getHeapStatistics().malloced_memory,

    	'Peak Malloced Memory' : v8.getHeapStatistics().peak_malloced_memory,

    	'Allocated Heap Used (%)' : Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),

    	'Available Heap Allocated (%)' : Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),

    	'Uptime' : os.uptime()+' Seconds'

  };

  helpers.verticalSpace(2);

  // Log out each stat
  helpers.printTable(stats);

  helpers.setFooter();

}

module.exports = stats;