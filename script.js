// Matrix animation
document.addEventListener('DOMContentLoaded', () => {
    // Matrix falling code effect
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to full window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters to display (you can customize these)
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
    }
    
    // Main drawing function
    function draw() {
        // Semi-transparent black to create fading effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text style
        ctx.fillStyle = '#00ff41'; // Matrix green
        ctx.font = fontSize + 'px monospace';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = characters[Math.floor(Math.random() * characters.length)];
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Move the position down
            drops[i]++;
            
            // Reset position if it's off screen or randomly to create varied effect
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = Math.floor(Math.random() * -10);
            }
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const newColumns = Math.floor(canvas.width / fontSize);
        
        if (newColumns > drops.length) {
            // Add new columns
            for (let i = drops.length; i < newColumns; i++) {
                drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
            }
        }
    });
    
    // Animation loop
    setInterval(draw, 50);
    
    // Terminal typing effect
    const introText = document.getElementById('intro-text');
    const linksDiv = document.querySelector('.links');
    const terminalBody = document.querySelector('.terminal-body');
    
    // Text to be displayed with typing effect
    const text = `> Welcome to l337.me
> Initializing system...
> ███████████████████████ 100%
> Access granted
> 
> Hello, I am Brando Dela Torre.
> Information Technology student at Cavite State University.
> Backend developer with interests in web security,
> reverse engineering, and penetration testing.
> 
> ROOT TERMINAL ACCESS v4.2.0
> -----------------------------
> $ whoami
> root
> $ id
> uid=0(root) gid=0(root) groups=0(root)
> $ cat /etc/passwd | grep brandodt
> brandodt:x:1000:1000:Brando Dela Torre:/home/brandodt:/bin/bash
> $ ls -la /root/
> drwx------  5 root root 4096 Mar 24 2025 .
> drwxr-xr-x 22 root root 4096 Feb 17 2025 ..
> -rw-------  1 root root 1863 Mar 22 2025 .bash_history
> -rw-r--r--  1 root root  570 Jan 31 2025 .bashrc
> drwx------  2 root root 4096 Mar 19 2025 .ssh
> drwxr-xr-x  3 root root 4096 Mar 24 2025 projects
> -rw-------  1 root root  742 Mar 23 2025 .secret
> $ cd /home/brandodt/
> $ ./show_links.sh
> Initializing connection...
> Authenticating...
> [====================================] 100%
> Connection secure. Displaying content:`;
    
    let index = 0;
    let typingSpeed = 40; // Default speed
    let fastSpeed = 5; // Fast typing speed
    let normalSpeed = 40; // Normal typing speed
    let isFastMode = false;
    let isTyping = true;
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    
    // Help tooltip message
    const helpTooltip = document.createElement('div');
    helpTooltip.classList.add('help-tooltip');
    helpTooltip.innerHTML = 'Press any key to speed up typing';
    terminalBody.appendChild(helpTooltip);
    
    // Hide tooltip after 5 seconds
    setTimeout(() => {
        helpTooltip.classList.add('fade-out');
        setTimeout(() => {
            helpTooltip.style.display = 'none';
        }, 500);
    }, 5000);
    
    // Function to simulate typing with command execution pauses
    function typeWriter() {
        if (index < text.length && isTyping) {
            // Add dramatic pauses after command execution
            if (text.substring(index, index + 2) === '> $' && index > 0) {
                setTimeout(() => {
                    introText.innerHTML += '<br>';
                    introText.innerHTML += '> $';
                    index += 2;
                    // Longer pause when "typing" a command
                    setTimeout(typeWriter, isFastMode ? 100 : 600);
                }, isFastMode ? 100 : 500);
            } else if (text.charAt(index) === '\n' && text.charAt(index + 1) === '>') {
                // Add a longer pause between command output and next command
                introText.innerHTML += '<br>';
                index++;
                setTimeout(typeWriter, isFastMode ? 50 : 300);
            } else if (text.charAt(index) === '\n') {
                introText.innerHTML += '<br>';
                index++;
                setTimeout(typeWriter, isFastMode ? 10 : 50);
            } else {
                introText.innerHTML += text.charAt(index);
                index++;
                // Random slight delay for realistic typing
                const randomDelay = isFastMode ? Math.random() * 10 : Math.random() * 80;
                setTimeout(typeWriter, typingSpeed + randomDelay);
            }
        } else if (index >= text.length) {
            // Add cursor at the end after typing is complete
            introText.appendChild(cursor);
            isTyping = false;
            // Show links after typing is complete
            setTimeout(() => {
                linksDiv.style.display = 'block';
                
                // Add skip message
                const skipMessage = document.createElement('div');
                skipMessage.classList.add('skip-message');
                skipMessage.textContent = 'Type "help" for commands';
                terminalBody.appendChild(skipMessage);
                
                // Set up terminal input
                setupTerminalInput();
            }, 1000);
        }
    }
    
    // Setup terminal input field for interactive commands
    function setupTerminalInput() {
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('terminal-input-container');
        
        const promptSpan = document.createElement('span');
        promptSpan.classList.add('prompt');
        promptSpan.textContent = 'root@l337.me:~# ';
        
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.classList.add('terminal-input');
        inputField.setAttribute('autocomplete', 'off');
        inputField.setAttribute('spellcheck', 'false');
        
        inputContainer.appendChild(promptSpan);
        inputContainer.appendChild(inputField);
        terminalBody.appendChild(inputContainer);
        
        // Focus input field
        setTimeout(() => {
            inputField.focus();
        }, 100);
        
        // Handle commands
        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = inputField.value.trim().toLowerCase();
                
                // Create a new output line with the command
                const commandLine = document.createElement('div');
                commandLine.classList.add('command-line');
                commandLine.innerHTML = `<span class="prompt">root@l337.me:~#</span> ${command}`;
                terminalBody.insertBefore(commandLine, inputContainer);
                
                // Reset input
                inputField.value = '';
                
                // Process command
                processCommand(command);
                
                // Scroll to bottom
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
        
        // Keep focus on input field
        document.addEventListener('click', () => {
            if (!isTyping) {
                inputField.focus();
            }
        });
    }
    
    // Process terminal commands
    function processCommand(command) {
        const outputDiv = document.createElement('div');
        outputDiv.classList.add('command-output');
        
        switch (command) {
            case 'help':
                outputDiv.innerHTML = `Available commands:
<br>- <span class="cmd">help</span>: Show this help message
<br>- <span class="cmd">about</span>: Show information about me
<br>- <span class="cmd">skills</span>: List my technical skills
<br>- <span class="cmd">contact</span>: Contact information
<br>- <span class="cmd">links</span>: Show all social links
<br>- <span class="cmd">clear</span>: Clear the terminal`;
                break;
                
            case 'about':
                outputDiv.innerHTML = `Brando Dela Torre
<br>-------------------
<br>Information Technology student at Cavite State University
<br>Specializing in backend development and cybersecurity.`;
                break;
                
            case 'skills':
                outputDiv.innerHTML = `Technical Skills:
<br>-------------------
<br>- Web Development 
<br>- Penetration Testing 
<br>- Reverse Engineering`;
                break;
                
            case 'contact':
                outputDiv.innerHTML = `Contact Information:
<br>-------------------
<br>Email: <a href="mailto:brandodt@proton.me">brandodt@proton.me</a>`;
                break;
                
            case 'links':
                outputDiv.innerHTML = `Social Links:
<br>-------------------`;
                const linksCopy = linksDiv.cloneNode(true);
                linksCopy.style.display = 'block';
                outputDiv.appendChild(linksCopy);
                break;
                
            case 'clear':
                // Clear all child elements except the input container
                while (terminalBody.firstChild) {
                    if (terminalBody.lastChild.classList && 
                        terminalBody.lastChild.classList.contains('terminal-input-container')) {
                        break;
                    }
                    terminalBody.removeChild(terminalBody.firstChild);
                }
                return; // Don't add any output
                
            case 'ls':
                outputDiv.innerHTML = `projects  documents  .config  .ssh`;
                break;
                
            case 'pwd':
                outputDiv.innerHTML = `/home/brandodt`;
                break;
                
            case 'date':
                outputDiv.innerHTML = `${new Date().toString()}`;
                break;
                
            default:
                outputDiv.innerHTML = `Command not found: ${command}`;
        }
        
        terminalBody.insertBefore(outputDiv, terminalBody.querySelector('.terminal-input-container'));
    }
    
    // Handle key presses to speed up typing
    document.addEventListener('keydown', function(e) {
        // Only respond to key presses if still typing
        if (isTyping) {
            if (!isFastMode) {
                // Switch to fast mode
                isFastMode = true;
                typingSpeed = fastSpeed;
                
                // Show skip message
                const skipMessage = document.createElement('div');
                skipMessage.classList.add('skip-message');
                skipMessage.textContent = 'Fast mode activated!';
                terminalBody.appendChild(skipMessage);
                
                // Remove message after 2 seconds
                setTimeout(() => {
                    skipMessage.classList.add('fade-out');
                    setTimeout(() => {
                        if (skipMessage.parentNode === terminalBody) {
                            terminalBody.removeChild(skipMessage);
                        }
                    }, 500);
                }, 2000);
            }
            
            // If pressing Tab or Escape, skip the typing entirely
            if (e.key === 'Tab' || e.key === 'Escape') {
                e.preventDefault(); // Prevent default Tab behavior
                
                // Stop the typing animation
                isTyping = false;
                
                // Display the entire text at once
                introText.innerHTML = text.replace(/\n/g, '<br>');
                
                // Append cursor and show links immediately
                introText.appendChild(cursor);
                linksDiv.style.display = 'block';
                
                // Add skip message
                const skipMessage = document.createElement('div');
                skipMessage.classList.add('skip-message');
                skipMessage.textContent = 'Type "help" for commands';
                terminalBody.appendChild(skipMessage);
                
                // Set up terminal input
                setupTerminalInput();
            }
        }
    });
    
    // Handle touch events for mobile devices
    document.addEventListener('touchstart', function(e) {
        if (isTyping) {
            if (!isFastMode) {
                // Switch to fast mode
                isFastMode = true;
                typingSpeed = fastSpeed;
                
                // Show skip message
                const skipMessage = document.createElement('div');
                skipMessage.classList.add('skip-message');
                skipMessage.textContent = 'Fast mode activated! Tap again to skip';
                terminalBody.appendChild(skipMessage);
                
                // Remove message after 2 seconds
                setTimeout(() => {
                    skipMessage.classList.add('fade-out');
                    setTimeout(() => {
                        if (skipMessage.parentNode === terminalBody) {
                            terminalBody.removeChild(skipMessage);
                        }
                    }, 500);
                }, 2000);
            } else {
                // If already in fast mode, skip the typing entirely on second tap
                // Stop the typing animation
                isTyping = false;
                
                // Display the entire text at once
                introText.innerHTML = text.replace(/\n/g, '<br>');
                
                // Append cursor and show links immediately
                introText.appendChild(cursor);
                linksDiv.style.display = 'block';
                
                // Add skip message
                const skipMessage = document.createElement('div');
                skipMessage.classList.add('skip-message');
                skipMessage.textContent = 'Tap terminal for commands';
                terminalBody.appendChild(skipMessage);
                
                // Set up terminal input
                setupTerminalInput();
            }
        }
    });
    
    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
});