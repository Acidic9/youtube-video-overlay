var notyf = new Notyf();
var oldSettings = {
	volume: 0,
	playbackSpeed: 2,
	resumePlayback: true
};

$(document).ready(function() {
	$("#volume").ionRangeSlider({
		min: 0,
		max: 100,
		from: oldSettings.volume,
		step: 1
	});

	$("#playbackSpeed").ionRangeSlider({
		from: getPlaybackSpeedDefault(),
		values: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2]
	});

	$("#resumePlayback").attr("checked", oldSettings.resumePlayback);

	getSettings();

	$("#saveSettingsBtn").click(saveSettings);
	$("#resetSettingsBtn").click(resetSettings);
});

function saveSettings() {
	var volume = $("#volume").val();
	var playbackSpeed = $("#playbackSpeed").val();
	var resumePlayback = $("#resumePlayback").attr("checked") ? true : false;

	chrome.storage.sync.set({
		volume: volume,
		playbackSpeed: playbackSpeed,
		resumePlayback: resumePlayback
	}, function() {
		notyf.confirm('Settings reset and saved!');
	});
}

function resetSettings() {
	$("#volume").data("ionRangeSlider").update({
		from: 0
	});

	$("#playbackSpeed").data("ionRangeSlider").update({
		from: 6
	});

	$("#resumePlayback").attr("checked", true);

	chrome.storage.sync.set({
		volume: 0,
		playbackSpeed: 2,
		resumePlayback: true
	}, function() {
		notyf.confirm('Settings reset and saved!');
	});
}

function getSettings() {
	chrome.storage.sync.get({
		volume: 0,
		playbackSpeed: 2,
		resumePlayback: true
	}, function(opt) {
		oldSettings = opt;
		$("#volume").data("ionRangeSlider").update({
			from: opt.volume
		});

		$("#playbackSpeed").data("ionRangeSlider").update({
			from: getPlaybackSpeedDefault()
		});

		$("#resumePlayback").attr("checked", oldSettings.resumePlayback);
	});
}

function getPlaybackSpeedDefault() {
	switch (parseFloat(oldSettings.playbackSpeed)) {
	case 0.25:
		return 0;
		break;

	case 0.5:
		return 1;
		break;

	case 0.75:
		return 2;
		break;

	case 1:
		return 3;
		break;

	case 1.25:
		return 4;
		break;

	case 1.5:
		return 5;
		break;

	case 2:
		return 6;
		break;

	default:
		return 6;
		break;
	}
	return 6;
}