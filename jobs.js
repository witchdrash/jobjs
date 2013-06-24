function Jobs(tasks)
{
	this.tasks = tasks;
	this.taskOrder = new Array();
	this.position = -1;
}

Jobs.prototype.doJob = function(jobName)
{
	this.taskOrder[this.taskOrder.length] = 'this.tasks.' + jobName + '(this)'
}

Jobs.prototype.runJobs = function()
{
	this.position = -1;
	this.nextJob();
}

Jobs.prototype.nextJob = function()
{
	this.position++;
	if(this.position >= this.taskOrder.length)
		return;
		
	eval(this.taskOrder[this.position])
}

module.exports = Jobs;