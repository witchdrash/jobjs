var request = require('superagent');
var expect = require('expect.js');
var jobRunner = require('./jobs.js');

var testJob = function()
{
	return 'test job called';
}

function TestTasks()
{
	this.calledJobs = new Array();
}
TestTasks.prototype.jobOne = function(manager)
{
	this.calledJobs[this.calledJobs.length] = "jobOne";
	manager.nextJob();
}
TestTasks.prototype.jobTwo = function(manager)
{
	for(var i=0;i<10000;i++)
	{
	
	}
	this.calledJobs[this.calledJobs.length] = "jobTwo";
	manager.nextJob();
}
TestTasks.prototype.jobThree = function(manager)
{
	this.calledJobs[this.calledJobs.length] = "jobThree";
	manager.nextJob();
}

describe('job checks', function()
{
	it('sets the jobs correctly', function(done)
	{
		var testJob = new TestTasks();
		var job = new jobRunner(testJob);
		expect(job.tasks).to.equal(testJob);
		done();
	});
	it('can call the specified job', function(done)
	{
		var testJob = new TestTasks();
		var job = new jobRunner(testJob);
		
		job.doJob('jobOne');
		job.runJobs();
		expect(testJob.calledJobs.length).to.equal(1);
		expect(testJob.calledJobs[0]).to.equal("jobOne");
		done();
	});
	it('can maintain the job order', function(done)
	{
		var testJob = new TestTasks();
		var job = new jobRunner(testJob);
		job.doJob('jobOne');
		job.doJob('jobTwo');
		job.doJob('jobThree');
		job.runJobs();
		expect(testJob.calledJobs.length).to.equal(3);
		expect(testJob.calledJobs[0]).to.equal("jobOne");
		expect(testJob.calledJobs[1]).to.equal("jobTwo");
		expect(testJob.calledJobs[2]).to.equal("jobThree");
		done();
	});
});
