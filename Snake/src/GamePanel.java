import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Arrays;
import java.util.Random;

public class GamePanel extends JPanel implements ActionListener {

    static final int SCREEN_WIDTH = 600;
    static final int SCREEN_HEIGHT = 600;
    static final int UNIT_SIZE = 25;
    static final int BORDER = 1;
    static final int GAME_UNITS = (SCREEN_WIDTH*SCREEN_HEIGHT)/(UNIT_SIZE*UNIT_SIZE);
    static final int DELAY = 500;
    static final int INITIAL_PARTS = 2;
    static final char DEFAULT_DIR = 'R';
    final int[] x = new int[GAME_UNITS];
    final int[] y = new int[GAME_UNITS];
    int bodyParts, applesEaten, appleX, appleY;
    char direction;
    boolean running = false;
    boolean paused = false;
    Timer timer;
    Random random;

    GamePanel(){
        random = new Random();
        this.setPreferredSize(new Dimension(SCREEN_WIDTH, SCREEN_HEIGHT));
        this.setBackground(Color.BLACK);
        this.setFocusable(true);
        this.addKeyListener(new MyKeyAdapter());
    }
    public void startGame() {
        bodyParts = INITIAL_PARTS;
        appleX = appleY = applesEaten = 0;
        direction = DEFAULT_DIR;
        Arrays.fill(x, BORDER);
        Arrays.fill(y, BORDER);

        newApple();
        running = true;
        timer = new Timer(DELAY, this);
        timer.start();
    }
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        draw(g);
    }
    public void draw(Graphics g) {

        for (int i = 0; i < SCREEN_HEIGHT/UNIT_SIZE; i++) {
            g.drawLine(i * UNIT_SIZE, 0, i * UNIT_SIZE, SCREEN_HEIGHT);
            g.drawLine(0, i * UNIT_SIZE, SCREEN_WIDTH, i * UNIT_SIZE);
        }

        if (paused) {
            g.setColor(Color.WHITE);
            g.setFont(new Font("Ink Free", Font.BOLD, 20));
            FontMetrics metrics = getFontMetrics(g.getFont());
            g.drawString("Paused", (SCREEN_WIDTH-metrics.stringWidth("Paused"))/2, SCREEN_HEIGHT/2);
        } else if (running) {
            g.setColor(Color.RED);
            g.fillOval(appleX, appleY, UNIT_SIZE, UNIT_SIZE);

            for (int i = 0; i < bodyParts; i++) {
                if (i == 0) {
                    g.setColor(Color.GREEN);
                    g.fillRect(x[i], y[i], UNIT_SIZE - (BORDER*2), UNIT_SIZE - (BORDER*2));
                } else {
                    g.setColor(new Color(45, 180, 0));
                    switch (Integer.compare(x[i], x[i-1])) {
                        case 1:
                            g.fillRect(x[i] - 2 * BORDER, y[i], UNIT_SIZE, UNIT_SIZE - (BORDER * 2));
                            break;
                        case -1:
                            g.fillRect(x[i], y[i], UNIT_SIZE, UNIT_SIZE - (BORDER * 2));
                            break;
                        case 0:
                            switch (Integer.compare(y[i], y[i-1])) {
                                case 1:
                                    g.fillRect(x[i], y[i] - 2*BORDER, UNIT_SIZE - (BORDER*2), UNIT_SIZE);
                                    break;
                                case -1:
                                    g.fillRect(x[i], y[i], UNIT_SIZE - (BORDER*2), UNIT_SIZE);
                                    break;
                                case 0:
                                    g.fillRect(x[i], y[i], UNIT_SIZE - (BORDER*2), UNIT_SIZE - (BORDER*2));
                                    break;
                            }
                    }
                }
            }
        } else {
            gameOver(g);
        }
    }
    public void newApple() {
        appleX = random.nextInt((int)SCREEN_WIDTH/UNIT_SIZE) * UNIT_SIZE;
        appleY = random.nextInt((int)SCREEN_HEIGHT/UNIT_SIZE) * UNIT_SIZE;
        for (int i = 0; i < bodyParts; i++) {
            if (appleX == x[i] - BORDER && appleY == y[i] - BORDER) {
                newApple();
            }
        }
    }
    public void move() {
        for (int i = bodyParts; i > 0; i--) {
            x[i] = x[i-1];
            y[i] = y[i-1];
        }

        switch (direction) {
            case 'U':
                y[0] = y[0] - UNIT_SIZE;
                break;
            case 'D':
                y[0] = y[0] + UNIT_SIZE;
                break;
            case 'L':
                x[0] = x[0] - UNIT_SIZE;
                break;
            case 'R':
                x[0] = x[0] + UNIT_SIZE;
                break;
        }
    }
    public void checkApple() {
        if (x[0] - BORDER == appleX && y[0] -BORDER == appleY)  {
            bodyParts++;
            applesEaten++;
            if (bodyParts < GAME_UNITS) {
                newApple();
            } else {
                running = false;
            }
        }
    }
    public void checkCollisions() {
        for (int i = bodyParts - 1; i > 0; i--) {
            if (x[0] == x[i] && y[0] == y[i]) {
                running = false;
                break;
            }
        }

        if (x[0] < 0 || x[0] >= SCREEN_WIDTH || y[0] < 0 || y[0] >= SCREEN_HEIGHT) {
            running = false;
        }

        if (!running) timer.stop();
    }
    public void gameOver(Graphics g) {
        g.setColor(Color.WHITE);
        g.setFont(new Font("Ink Free", Font.BOLD, 20));
        FontMetrics metrics = getFontMetrics(g.getFont());
        String score = bodyParts == GAME_UNITS ? "---Perfect Snake---" : "Final score: " + applesEaten;
        g.drawString(score, (SCREEN_WIDTH-metrics.stringWidth(score))/2, SCREEN_HEIGHT/2);
        String start = "Press SPACE to start new game";
        g.drawString(start, (SCREEN_WIDTH-metrics.stringWidth(start))/2, SCREEN_HEIGHT/2-2*metrics.getHeight());
        String pause = "ESC to pause the game";
        g.drawString(pause, (SCREEN_WIDTH-metrics.stringWidth(pause))/2, SCREEN_HEIGHT/2-metrics.getHeight());
    }
    @Override
    public void actionPerformed(ActionEvent e) {

        if (!paused) {
            if (running) {
                move();
                checkApple();
                checkCollisions();
            }
        }
        repaint();

    }

    public class MyKeyAdapter extends KeyAdapter {
        @Override
        public void keyPressed(KeyEvent e) {
            if (paused) {
                if (e.getKeyCode() == KeyEvent.VK_ESCAPE) paused = false;
            } else if (running) {
                switch (e.getKeyCode()) {
                    case KeyEvent.VK_LEFT: case KeyEvent.VK_A:
                    //    if (direction != 'R') direction = 'L';
                        if (y[0] != y[1]) direction = 'L';
                        break;
                    case KeyEvent.VK_RIGHT: case KeyEvent.VK_D:
                    //    if (direction != 'L') direction = 'R';
                        if (y[0] != y[1]) direction = 'R';
                        break;
                    case KeyEvent.VK_UP: case KeyEvent.VK_W:
                    //    if (direction != 'D') direction = 'U';
                        if (x[0] != x[1]) direction = 'U';
                        break;
                    case KeyEvent.VK_DOWN: case KeyEvent.VK_S:
                    //    if (direction != 'U') direction = 'D';
                        if (x[0] != x[1]) direction = 'D';
                        break;
                    case KeyEvent.VK_ESCAPE:
                        paused = true;
                        break;
                }
            } else {
                if (e.getKeyCode() == KeyEvent.VK_SPACE) startGame();
            }
        }
    }
}
