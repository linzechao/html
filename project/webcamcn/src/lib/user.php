<?php
    // 数据库信息
    $db = array(
        'host' => 'qdm161234316.my3w.com',
        'user' => 'qdm161234316',
        'pwd' => '631924081',
        'db' => 'qdm161234316_db',
        'table' => 'user'
    );
    $result = array(
        'status' => 0,
        'msg' => '操作失败...'
    );

    switch($_GET['action']) {
        case 'getUser':
            $result['data'] = array();
            // 链接数据库
            $connection = new mysqli($db['host'], $db['user'], $db['pwd'], $db['db']);
            $res = $connection -> query('SELECT * FROM '.$db['table']);
            if ($res -> num_rows > 0) {
                while ($data = $res -> fetch_assoc()) {
                    array_push($result['data'], array(
                        'id' => $data['id'],
                        'user' => $data['user'],
                        'password' => $data['password'],
                        'date' => $data['date'],
                        'name' => $data['name'],
                        'email' => $data['email'],
                        'phone' => $data['phone']
                    ));
                }
            }
            // 关闭数据库
            $connection -> close();
        break;

        case 'register':
            $user = $_POST['user'];
            $password = $_POST['password'];
            $name = $_POST['name'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $date = date('Y-m-d H:i:s');

            if (empty($user) || strlen($user) < 6 || strlen($user) > 20 ||
                empty($password) || strlen($password) < 6 || strlen($password) > 20) {
                $result['msg'] = '你不乖喔~';
            } else {
                $connection = new mysqli($db['host'], $db['user'], $db['pwd'], $db['db']);


                $sql = 'SELECT id FROM '.$db['table'].' WHERE user = "'.$user.'"'.
                    ($email ? ' or email = "'.$email.'"' : '').
                    ($phone ? ' or phome = "'.$phone.'"' : '');


                if ($connection -> query($sql) -> num_rows > 0) {
                    // 已存在
                    $result['msg'] = '用户名或邮箱或手机已经被注册，请重新操作!';
                } else {
                    // 插入数据库
                    $sql = 'INSERT INTO '.$db['table'].'(user, password, name, email, phone, date) VALUES("'.
                        $user.'", "'.$password.'", "'.$name.'", "'.$email.'", "'.$phone.'", "'.$date.'")';
                    if ($connection -> query($sql)) {
                        $result['status'] = 1;
                    }
                }
                // 关闭数据库
                $connection -> close();
            }
        break;
    }

    // 返回数据
    echo json_encode($result);
?>
