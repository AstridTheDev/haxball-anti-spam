    // anti spam template
    // modifique o codigo para implementar na sua sala
    // me de os creditos, por favor
    
    const room = HBInit({
        roomName: "Anti-Spam",
        maxPlayers: 16,
        public: false,
        noPlayer: true
    });

    const maxSpam = 5; // quantidade máxima de mensagens iguais (spam)
    const maxMessages = 7; // quantidade máxima de mensagens dentro do cooldown
    const spamWindow = 5000; // cooldown (milissegundos)
    const muteTime = 10; // tempo de mute

    const floodData = {};

    function createPlayerData() {
        return {
            lastMessage: "",
            repetitions: 0,
            mutedUntil: 0,
            recentMessages: []
        };
    }

    function normalizeMessage(message) {
        return message
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");
    }

    function mutePlayer(player, data, reason) {
        const now = Date.now();

        data.mutedUntil = now + muteTime * 1000;
        data.lastMessage = "";
        data.repetitions = 0;
        data.recentMessages = [];

        room.sendAnnouncement(
            `${player.name} foi mutado por ${muteTime}s (${reason}).`,
            null,
            0xFF5555,
            "bold",
            1
        );
    }

    function checkFlood(player, message) {
        const now = Date.now();

        if (!floodData[player.id]) {
            floodData[player.id] = createPlayerData();
        }

        const data = floodData[player.id];

        if (now < data.mutedUntil) {
            const remainingTime = Math.ceil(
                (data.mutedUntil - now) / 1000
            );

            room.sendAnnouncement(
                `Você está mutado. Aguarde ${remainingTime}s.`,
                player.id,
                0xFF5555,
                "bold",
                1
            );

            return false;
        }

        data.recentMessages = data.recentMessages.filter(
            time => now - time < spamWindow
        );

        data.recentMessages.push(now);

        if (data.recentMessages.length >= maxMessages) {
            mutePlayer(
                player,
                data,
                `${maxMessages} mensagens em ${spamWindow / 1000}s`
            );

            return false;
        }

        const normalizedMessage = normalizeMessage(message);

        if (normalizedMessage === data.lastMessage) {
            data.repetitions++;
        } else {
            data.lastMessage = normalizedMessage;
            data.repetitions = 1;
        }

        if (data.repetitions >= maxSpam) {
            mutePlayer(
                player,
                data,
                `${maxSpam} mensagens iguais`
            );

            return false;
        }

        return true;
    }

    room.onPlayerChat = function(player, message) {
        return checkFlood(player, message);
    };

    room.onPlayerJoin = function(player) {
        floodData[player.id] = createPlayerData();

        room.sendAnnouncement(
            "Anti-Spam 1.0v loaded, by astrid",
            player.id,
            0xFFFFFF,
            "normal",
            1
        );
    };

    room.onPlayerLeave = function(player) {
        delete floodData[player.id];
    };
